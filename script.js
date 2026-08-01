/**
 * script.js — landing page behavior
 * Sin frameworks. Compatible con GitHub Pages.
 */

(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navLinks = document.querySelector("[data-nav-links]");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reveal on scroll (setup compartido) ---------- */
  var revealSupported = "IntersectionObserver" in window;
  var revealObserver = null;

  if (revealSupported) {
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
  }

  function observeReveal(el) {
    if (revealObserver) {
      revealObserver.observe(el);
    } else {
      el.classList.add("is-visible");
    }
  }

  /* ---------- Render project cards from data/projects.js ---------- */
  var listEl = document.querySelector("[data-project-list]");

  function t(key, fallback) {
    var lang = window.getLang ? window.getLang() : "es";
    var d = (window.I18N && window.I18N[lang]) || {};
    return d[key] !== undefined ? d[key] : fallback;
  }

  function statusClass(status) {
    if (status === "done") return "status-pass";
    if (status === "progress") return "status-progress";
    return "status-info";
  }

  function translatedStatusLabel(project) {
    var lang = window.getLang ? window.getLang() : "es";
    if (lang === "en" && project.statusLabelEn) return project.statusLabelEn;
    return project.statusLabel;
  }

  function translatedDescription(project) {
    var lang = window.getLang ? window.getLang() : "es";
    if (lang === "en" && project.descriptionEn) return project.descriptionEn;
    return project.description;
  }

  function renderLink(label, url) {
    if (url) {
      return (
        '<a href="' +
        url +
        '" target="_blank" rel="noopener noreferrer">' +
        label +
        "</a>"
      );
    }
    var pendingLabel = t("project.link.pending", "(pendiente)");
    return '<span class="disabled">' + label + " " + pendingLabel + "</span>";
  }

  function renderProject(project, index) {
    var techTags = project.technologies
      .map(function (t) {
        return "<span>" + t + "</span>";
      })
      .join("");

    var lang = window.getLang ? window.getLang() : "es";
    var deployLabel = (lang === "en" && project.deployLabelEn) || project.deployLabel || t("project.link.deploy", "Deploy");

    var links =
      renderLink(t("project.link.detail", "Detalle"), project.pageUrl) +
      renderLink(t("project.link.repo", "Repositorio"), project.repositoryUrl) +
      renderLink(deployLabel, project.deployUrl);

    var description = translatedDescription(project);
    var statusLabel = translatedStatusLabel(project);

    if (project.featured) {
      return (
        '<article class="project-card featured reveal">' +
        '<div class="project-head">' +
        "<div>" +
        '<span class="project-index">PROYECTO_DESTACADO / 0' +
        (index + 1) +
        "</span>" +
        "<h3>" +
        project.title +
        "</h3>" +
        "</div>" +
        '<span class="status ' +
        statusClass(project.status) +
        '">' +
        statusLabel +
        "</span>" +
        "</div>" +
        '<p class="project-desc">' +
        description +
        "</p>" +
        '<div class="project-tech">' +
        techTags +
        "</div>" +
        '<div class="project-links">' +
        links +
        "</div>" +
        "</article>"
      );
    }

    return (
      '<article class="project-card reveal">' +
      "<div>" +
      '<span class="project-index">0' +
      (index + 1) +
      "</span>" +
      "<h3>" +
      project.title +
      "</h3>" +
      '<p class="project-desc">' +
      description +
      "</p>" +
      '<div class="project-tech">' +
      techTags +
      "</div>" +
      '<div class="project-links">' +
      links +
      "</div>" +
      "</div>" +
      '<div class="project-status-col">' +
      '<span class="status ' +
      statusClass(project.status) +
      '">' +
      statusLabel +
      "</span>" +
      "</div>" +
      "</article>"
    );
  }

  var hasRenderedProjectsOnce = false;

  window.renderProjectList = function () {
    if (!listEl || !window.PROJECTS) return;
    var featured = window.PROJECTS.filter(function (p) {
      return p.featured;
    });
    var rest = window.PROJECTS.filter(function (p) {
      return !p.featured;
    });
    var ordered = featured.concat(rest);

    listEl.innerHTML = ordered.map(renderProject).join("");

    // Las tarjetas nuevas arrancan con opacity:0 (clase .reveal) para el
    // efecto de aparición al hacer scroll. Eso solo tiene sentido en el
    // primer render: si se re-renderiza (cambio de idioma), el observer
    // ya pasó por su ciclo de vida normal y estas tarjetas son elementos
    // del DOM completamente nuevos que nunca vio — quedarían invisibles
    // para siempre si dependemos de él otra vez. Por eso, a partir del
    // segundo render, las mostramos ya, sin animación.
    if (hasRenderedProjectsOnce) {
      listEl.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      listEl.querySelectorAll(".reveal").forEach(observeReveal);
    }
    hasRenderedProjectsOnce = true;
  };

  window.renderProjectList();
  document.addEventListener("portfolio:langchange", window.renderProjectList);

  /* ---------- Reveal on scroll: resto de la página ---------- */
  // Las project-cards ya se observaron arriba; acá va todo lo demás
  // (hero, sobre mí, tecnologías, formación, contacto).
  var revealEls = Array.prototype.slice
    .call(document.querySelectorAll(".reveal"))
    .filter(function (el) {
      return !listEl || !listEl.contains(el);
    });

  revealEls.forEach(observeReveal);

  if (revealSupported) {
    // Red de seguridad: si por lo que sea el navegador no llega a
    // disparar la intersección de algún elemento (scroll muy rápido,
    // timing raro, etc.), nunca debería quedar contenido invisible
    // para siempre. A los 900ms forzamos visible todo lo que falte.
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 900);
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Hero terminal: live suite-run animation ---------- */
  var terminalBody = document.querySelector("[data-terminal]");

  if (terminalBody) {
    var terminalEl = terminalBody.closest(".terminal");
    var cmdEl = terminalBody.querySelector("[data-typewriter]");
    var cursorEl = terminalBody.querySelector("[data-cmd-cursor]");
    var testLines = Array.prototype.slice.call(
      terminalBody.querySelectorAll("[data-test-line]")
    );
    var summaryEl = terminalBody.querySelector("[data-term-summary]");
    var passedEl = terminalBody.querySelector("[data-term-passed]");
    var elapsedEl = terminalBody.querySelector("[data-term-elapsed]");

    var TARGET_ELAPSED_MS = 3412;

    function formatElapsed(ms) {
      var totalSeconds = ms / 1000;
      var minutes = Math.floor(totalSeconds / 60);
      var seconds = Math.floor(totalSeconds % 60);
      var millis = Math.floor(ms % 1000);
      function pad(n, len) {
        return String(n).padStart(len, "0");
      }
      return "00:" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(millis, 3);
    }

    function showFinalState() {
      if (cmdEl) cmdEl.textContent = cmdEl.getAttribute("data-typewriter");
      testLines.forEach(function (line) {
        var statusEl = line.querySelector("[data-test-status]");
        if (statusEl) {
          statusEl.textContent = line.getAttribute("data-final-label") || "PASS";
          statusEl.classList.add("is-pass");
        }
      });
      if (passedEl) passedEl.textContent = String(testLines.length);
      if (elapsedEl) elapsedEl.textContent = formatElapsed(TARGET_ELAPSED_MS);
    }

    var prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !cmdEl) {
      showFinalState();
    } else {
      var fullCmd = cmdEl.getAttribute("data-typewriter") || "";

      function resetTerminal() {
        cmdEl.textContent = "";
        if (cursorEl) cursorEl.style.display = "";
        testLines.forEach(function (line) {
          var statusEl = line.querySelector("[data-test-status]");
          if (statusEl) {
            statusEl.classList.remove("is-running", "is-pass");
            statusEl.textContent = "—";
          }
        });
        if (passedEl) passedEl.textContent = "0";
        if (elapsedEl) elapsedEl.textContent = "00:00:00.000";
        if (summaryEl) summaryEl.classList.remove("is-done");
      }

      function typeChar(i) {
        if (i <= fullCmd.length) {
          cmdEl.textContent = fullCmd.slice(0, i);
          setTimeout(function () {
            typeChar(i + 1);
          }, 22);
        } else {
          setTimeout(runTests, 300);
        }
      }

      function runTests() {
        if (cursorEl) cursorEl.style.display = "none";
        if (terminalEl) terminalEl.classList.add("is-running");
        var passedCount = 0;
        var index = 0;

        function runNext() {
          if (index >= testLines.length) {
            if (terminalEl) terminalEl.classList.remove("is-running");
            setTimeout(animateElapsed, 200);
            return;
          }
          var line = testLines[index];
          var statusEl = line.querySelector("[data-test-status]");
          if (statusEl) {
            statusEl.textContent = "RUNNING";
            statusEl.classList.add("is-running");
          }
          setTimeout(function () {
            if (statusEl) {
              statusEl.classList.remove("is-running");
              statusEl.textContent = line.getAttribute("data-final-label") || "PASS";
              statusEl.classList.add("is-pass");
            }
            passedCount++;
            if (passedEl) passedEl.textContent = String(passedCount);
            index++;
            setTimeout(runNext, 160);
          }, 420);
        }

        runNext();
      }

      function animateElapsed() {
        var start = null;
        var duration = 700;
        var targetMs = 3100 + Math.round(Math.random() * 500);

        function step(timestamp) {
          if (!start) start = timestamp;
          var progress = Math.min((timestamp - start) / duration, 1);
          if (elapsedEl) {
            elapsedEl.textContent = formatElapsed(progress * targetMs);
          }
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            if (summaryEl) summaryEl.classList.add("is-done");
            setTimeout(loopAgain, 2400);
          }
        }

        requestAnimationFrame(step);
      }

      function loopAgain() {
        resetTerminal();
        setTimeout(function () {
          typeChar(0);
        }, 400);
      }

      typeChar(0);
    }
  }
})();
