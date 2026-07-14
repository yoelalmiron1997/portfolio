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

  /* ---------- Render project cards from data/projects.js ---------- */
  var listEl = document.querySelector("[data-project-list]");

  function statusClass(status) {
    if (status === "done") return "status-pass";
    if (status === "progress") return "status-progress";
    return "status-info";
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
    return '<span class="disabled">' + label + " (pendiente)</span>";
  }

  function renderProject(project, index) {
    var techTags = project.technologies
      .map(function (t) {
        return "<span>" + t + "</span>";
      })
      .join("");

    var links =
      renderLink("Detalle", project.pageUrl) +
      renderLink("Repositorio", project.repositoryUrl) +
      renderLink("Deploy", project.deployUrl);

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
        project.statusLabel +
        "</span>" +
        "</div>" +
        '<p class="project-desc">' +
        project.description +
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
      project.description +
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
      project.statusLabel +
      "</span>" +
      "</div>" +
      "</article>"
    );
  }

  if (listEl && window.PROJECTS) {
    var featured = window.PROJECTS.filter(function (p) {
      return p.featured;
    });
    var rest = window.PROJECTS.filter(function (p) {
      return !p.featured;
    });
    var ordered = featured.concat(rest);

    listEl.innerHTML = ordered.map(renderProject).join("");
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
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
