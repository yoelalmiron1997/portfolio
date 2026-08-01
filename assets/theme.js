/* ============================================================
   Theme toggle (oscuro / claro)
   - Persiste en localStorage bajo la clave "portfolio_theme".
   - Este script se carga SIN defer/async justo después de
     styles.css, así el atributo data-theme se fija antes del
     primer pintado (evita el "flash" de tema incorrecto).
   ============================================================ */
(function () {
  "use strict";

  var KEY = "portfolio_theme";

  function getSavedTheme() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {
      /* localStorage no disponible (modo privado, etc.) — no rompemos nada */
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    saveTheme(theme);
    updateToggleButtons(theme);
  }

  function updateToggleButtons(theme) {
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].textContent = theme === "light" ? "🌙" : "☀️";
      buttons[i].setAttribute(
        "aria-label",
        theme === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"
      );
    }
  }

  window.toggleTheme = function () {
    var current = document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  };

  // Aplicar el tema guardado (o "dark" por default) apenas se puede,
  // antes de que el resto del documento termine de cargar.
  applyTheme(getSavedTheme() || "dark");

  document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", window.toggleTheme);
    }
  });
})();
