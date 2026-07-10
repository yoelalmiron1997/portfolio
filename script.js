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
})();
