/* ============================================================
   i18n engine — traducción ES/EN del portfolio.
   - Lee window.I18N (definido en dictionary.js) con la forma:
       { es: { "clave": "texto" }, en: { "clave": "texto" } }
   - Aplica traducciones a cualquier elemento marcado con:
       data-i18n="clave"        -> reemplaza textContent
       data-i18n-html="clave"   -> reemplaza innerHTML (para texto
                                    con tags inline como <br>, <b>)
       data-i18n-attr="attr:clave" -> reemplaza un atributo puntual
                                       (ej: content de <meta>)
   - Persiste el idioma elegido en localStorage ("portfolio_lang").
   - Expone window.getLang() y window.setLanguage(lang) para que
     otros scripts (script.js, qa-game.js) lean/reaccionen al idioma.
   ============================================================ */
(function () {
  "use strict";

  var KEY = "portfolio_lang";
  var DEFAULT_LANG = "es";

  function getSavedLang() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {
      /* localStorage no disponible — no rompemos nada */
    }
  }

  window.getLang = function () {
    return document.documentElement.getAttribute("lang") === "en" ? "en" : "es";
  };

  function dict(lang) {
    return (window.I18N && window.I18N[lang]) || {};
  }

  function translate(key, lang) {
    var d = dict(lang);
    if (d[key] !== undefined) return d[key];
    // Fallback a español si falta la clave en el idioma pedido
    var esDict = dict("es");
    return esDict[key] !== undefined ? esDict[key] : null;
  }

  function applyLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);
    saveLang(lang);

    var textNodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < textNodes.length; i++) {
      var key = textNodes[i].getAttribute("data-i18n");
      var value = translate(key, lang);
      if (value !== null) textNodes[i].textContent = value;
    }

    var htmlNodes = document.querySelectorAll("[data-i18n-html]");
    for (var j = 0; j < htmlNodes.length; j++) {
      var hKey = htmlNodes[j].getAttribute("data-i18n-html");
      var hValue = translate(hKey, lang);
      if (hValue !== null) htmlNodes[j].innerHTML = hValue;
    }

    var attrNodes = document.querySelectorAll("[data-i18n-attr]");
    for (var k = 0; k < attrNodes.length; k++) {
      var spec = attrNodes[k].getAttribute("data-i18n-attr");
      var parts = spec.split(":");
      var attrName = parts[0];
      var attrKey = parts[1];
      var attrValue = translate(attrKey, lang);
      if (attrValue !== null) attrNodes[k].setAttribute(attrName, attrValue);
    }

    updateLangButtons(lang);

    // Avisar a otros scripts (script.js re-renderiza las cards de
    // proyectos, qa-game.js relee el idioma la próxima vez que arranca).
    document.dispatchEvent(new CustomEvent("portfolio:langchange", { detail: { lang: lang } }));
  }

  function updateLangButtons(lang) {
    var buttons = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < buttons.length; i++) {
      var isActive = buttons[i].getAttribute("data-lang") === lang;
      buttons[i].classList.toggle("is-active", isActive);
    }
  }

  window.setLanguage = function (lang) {
    if (lang !== "es" && lang !== "en") return;
    applyLanguage(lang);
  };

  document.addEventListener("DOMContentLoaded", function () {
    var initialLang = getSavedLang() || DEFAULT_LANG;
    applyLanguage(initialLang);

    var buttons = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        window.setLanguage(this.getAttribute("data-lang"));
      });
    }
  });
})();
