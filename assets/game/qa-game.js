/* ============================================================
   QA DEFENSE — minijuego integrado al portfolio de Yoel Almirón
   ------------------------------------------------------------
   Concepto: la nave dispara "features/commits" contra el propio
   sitio. Mientras la Cobertura de Pruebas (Coverage %) se mantenga
   alta, la Suite de Pruebas (QA Coverage Shield) absorbe los
   impactos. Si la cobertura cae, los disparos dañan de verdad los
   elementos reales del DOM (tarjetas de proyecto, tags, títulos).

   Controles:
     - Rotar: A/D o flechas Izquierda/Derecha
     - Empuje: W/S o flechas Arriba/Abajo (adelante/atrás, con inercia)
     - Disparar: Espacio
     - Reforzar QA: click sobre un elemento del sitio, o el botón del HUD
     - Salir: Esc o botón "Salir"
   ============================================================ */
(function () {
  "use strict";

  var TARGET_SELECTOR =
    ".project-card, .edu-block, .tech-tag, h1, h2, .terminal, .hero-kicker";

  var WIN_TIME_SECONDS = 60;
  var LOSE_HOLD_SECONDS = 6;
  var BURST_THRESHOLD = 4;

  var PASS_PHRASES = [
    "✓ PyTest Assertion Passed!",
    "✓ Selenium 4 ExplicitWait handled delay",
    "✓ Page Object Model (POM) Verified",
    "✓ CI/CD Regression Check OK",
    "✓ Flaky Test Guarded",
    "✓ Smoke Test Green",
    "✓ Contract Test Held",
    "✓ API Schema Valid",
  ];

  var SNIPPETS = [
    "assert response.status_code == 200",
    "@pytest.mark.regression",
    'driver.find_element(By.ID, "btn")',
    "WebDriverWait(driver, 10).until(...)",
    "robot --outputdir results suite.robot",
    "expect(locator).to_be_visible()",
  ];

  var CICD_PHRASES = [
    "✓ Pipeline de CI/CD mejorado",
    "✓ Deploy automático estabilizado",
    "✓ Rollback disponible",
    "✓ Cobertura recuperada",
    "✓ Health check restaurado",
  ];

  var DAMAGE_CLASSES = ["qa-damaged-1", "qa-damaged-2", "qa-damaged-3"];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }
  function pick(arr) {
    return arr[(Math.random() * arr.length) | 0];
  }
  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function QAGame() {
    this.active = false;
    this.canvas = null;
    this.ctx = null;
    this.overlay = null;
    this.hud = null;
    this.rafId = null;
    this.lastTs = 0;

    this.keys = {};
    this.ship = null;
    this.bullets = [];
    this.particles = [];
    this.targets = [];

    this.coverage = 99;
    this.testCases = 148;
    this.health = 100;
    this.prevHealth = 100;
    this.featuresLaunched = 0;
    this.bugsBlocked = 0;
    this.bugsImpacted = 0;

    this.elapsed = 0;
    this.zeroHealthTimer = 0;
    this.ended = false;
    this.lastShotAt = 0;
    this.lastCicdAt = 0;
    this.lastBurstWarnAt = 0;
    this.shotTimestamps = [];
    this.onResize = this.recalcRects.bind(this);
    this.onKeyDown = this.handleKeyDown.bind(this);
    this.onKeyUp = this.handleKeyUp.bind(this);
  }

  QAGame.prototype.init = function () {
    var self = this;
    var launcher = document.createElement("button");
    launcher.type = "button";
    launcher.className = "qa-game-launcher";
    launcher.setAttribute("aria-label", "Abrir minijuego QA Defense");
    launcher.innerHTML =
      '<span class="pulse" aria-hidden="true"></span><span class="label">🎮 Testeá la Resistencia del Portfolio</span>';
    launcher.addEventListener("click", function () {
      self.start();
    });
    document.body.appendChild(launcher);
    this.launcher = launcher;
  };

  /* ---------------- Ciclo de vida ---------------- */

  QAGame.prototype.start = function () {
    if (this.active) return;
    this.active = true;

    this.coverage = 99;
    this.testCases = 148;
    this.health = 100;
    this.prevHealth = 100;
    this.featuresLaunched = 0;
    this.bugsBlocked = 0;
    this.bugsImpacted = 0;
    this.bullets = [];
    this.particles = [];
    this.keys = {};
    this.shotTimestamps = [];
    this.elapsed = 0;
    this.zeroHealthTimer = 0;
    this.ended = false;

    // Ya no bloqueamos el scroll: el jugador puede desplazarse por el
    // sitio mientras juega. Recalculamos posiciones en cada scroll.

    this.buildOverlay();
    this.buildHud();
    this.buildTargets();

    this.ship = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      angle: -Math.PI / 2,
      vx: 0,
      vy: 0,
    };
    this.resolveHudCollision();

    window.addEventListener("resize", this.onResize);
    window.addEventListener("scroll", this.onResize, { passive: true });
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);

    this.lastTs = performance.now();
    this.rafId = requestAnimationFrame(this.loop.bind(this));
  };

  QAGame.prototype.stop = function () {
    if (!this.active) return;
    this.active = false;

    cancelAnimationFrame(this.rafId);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("scroll", this.onResize);
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    document.documentElement.style.overflow = "";

    // Restaurar el DOM: sacar cualquier clase de daño que hayamos agregado.
    this.targets.forEach(function (t) {
      t.el.classList.remove(
        "qa-hit-shake",
        "qa-shield-restored",
        DAMAGE_CLASSES[0],
        DAMAGE_CLASSES[1],
        DAMAGE_CLASSES[2]
      );
    });

    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    if (this.hud && this.hud.parentNode) {
      this.hud.parentNode.removeChild(this.hud);
    }
    document.querySelectorAll(".qa-float").forEach(function (n) {
      n.remove();
    });

    this.overlay = null;
    this.hud = null;
    this.canvas = null;
    this.ctx = null;
  };

  /* ---------------- Construcción de DOM del juego ---------------- */

  QAGame.prototype.buildOverlay = function () {
    var overlay = document.createElement("div");
    overlay.className = "qa-game-overlay active";

    var canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    overlay.appendChild(canvas);
    document.body.appendChild(overlay);

    var self = this;
    canvas.addEventListener("click", function (e) {
      self.handleReinforceClick(e.clientX, e.clientY);
    });

    this.overlay = overlay;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  };

  QAGame.prototype.buildHud = function () {
    var hud = document.createElement("div");
    hud.className = "qa-hud";
    hud.innerHTML =
      '<div class="qa-hud-row qa-hud-system-row">' +
      '<span class="qa-hud-system-label">🛡 Sistema en defensa:</span>' +
      '<span class="qa-hud-system-name">yoelalmiron@portfolio</span>' +
      '<span class="qa-hud-system-status" data-qa-system-status>ESTABLE</span>' +
      "</div>" +
      '<div class="qa-hud-row">' +
      '<span class="qa-hud-label">Cobertura</span>' +
      '<div class="qa-bar-track"><div class="qa-bar-fill" data-qa-coverage-fill></div></div>' +
      '<span class="qa-hud-value" data-qa-coverage-value>99%</span>' +
      "</div>" +
      '<div class="qa-hud-row">' +
      '<span class="qa-hud-label">Salud del Sistema</span>' +
      '<div class="qa-bar-track"><div class="qa-bar-fill" data-qa-health-fill></div></div>' +
      '<span class="qa-hud-value" data-qa-health-value>100%</span>' +
      "</div>" +
      '<div class="qa-hud-row" style="font-size:0.7rem;color:var(--text-secondary)">' +
      '<span>Casos de prueba: <b data-qa-tc>148</b></span>' +
      '<span>Features lanzados: <b data-qa-features>0</b></span>' +
      '<span>Bloqueados: <b data-qa-blocked>0</b></span>' +
      '<span>Impactados: <b data-qa-impacted>0</b></span>' +
      "</div>" +
      '<div class="qa-hud-row" style="font-size:0.7rem;color:var(--text-secondary)">' +
      '<span>⏱ Sostené el sistema en pie: <b data-qa-timer>0:00</b> / 1:00</span>' +
      "</div>" +
      '<div class="qa-hud-row" style="font-size:0.7rem;color:var(--text-secondary)">' +
      '<span>Próxima Issue Épica en: <b data-qa-burst>4</b> disparos</span>' +
      "</div>" +
      '<div class="qa-hud-controls">' +
      "<span><kbd>A</kbd><kbd>D</kbd> rotar · <kbd>W</kbd><kbd>S</kbd> empuje · <kbd>Espacio</kbd> disparar feature · <kbd>R</kbd> disparar CI/CD (cura) · click en el sitio o \u2795 para reforzar QA</span>" +
      '<div class="qa-hud-actions">' +
      '<button type="button" class="qa-hud-btn" data-qa-add-tc>➕ Agregar Test Cases</button>' +
      '<button type="button" class="qa-hud-btn exit" data-qa-exit>Salir (Esc)</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(hud);

    var self = this;
    hud.querySelector("[data-qa-add-tc]").addEventListener("click", function () {
      self.reinforce(window.innerWidth / 2, 80);
    });
    hud.querySelector("[data-qa-exit]").addEventListener("click", function () {
      self.stop();
    });

    this.hud = hud;
    this.hudRect = hud.getBoundingClientRect();
    this.updateHud();
  };

  QAGame.prototype.buildTargets = function () {
    var self = this;
    this.targets = Array.prototype.slice
      .call(document.querySelectorAll(TARGET_SELECTOR))
      .filter(function (el) {
        // Ignorar elementos fuera de la vista actual (evita rects vacíos)
        var r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      })
      .map(function (el) {
        return { el: el, rect: el.getBoundingClientRect(), hits: 0, damageLevel: 0 };
      });
  };

  QAGame.prototype.recalcRects = function () {
    if (!this.active) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.targets.forEach(function (t) {
      t.rect = t.el.getBoundingClientRect();
    });
    if (this.hud) this.hudRect = this.hud.getBoundingClientRect();
  };

  /* ---------------- Input ---------------- */

  QAGame.prototype.handleKeyDown = function (e) {
    var k = e.key.toLowerCase();
    if (k === "escape") {
      this.stop();
      return;
    }
    this.keys[k] = true;
    if (k === " " || k === "spacebar") {
      e.preventDefault();
      this.shoot();
    }
    if (k === "r") {
      e.preventDefault();
      this.shootCicd();
    }
  };

  QAGame.prototype.handleKeyUp = function (e) {
    this.keys[e.key.toLowerCase()] = false;
  };

  QAGame.prototype.handleReinforceClick = function (x, y) {
    // Si el click cae sobre un target real, reforzamos justo ahí.
    var hitSomething = this.targets.some(function (t) {
      var r = t.rect;
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    });
    if (hitSomething) {
      this.reinforce(x, y);
    }
  };

  QAGame.prototype.reinforce = function (x, y) {
    this.testCases += 6;
    this.coverage = clamp(this.coverage + 9, 0, 99);
    this.health = clamp(this.health + 12, 0, 100);
    this.floatText(x, y, pick(SNIPPETS), "snippet");

    // Flash de "escudo restaurado" en los targets dañados más cercanos,
    // y bajarles un nivel de daño visual (reparación real, no solo un flash)
    var self = this;
    this.targets.forEach(function (t) {
      if (t.damageLevel > 0) {
        t.el.classList.remove(DAMAGE_CLASSES[t.damageLevel - 1]);
        t.damageLevel = Math.max(0, t.damageLevel - 1);
        t.hits = Math.max(0, t.hits - 2);
        if (t.damageLevel > 0) t.el.classList.add(DAMAGE_CLASSES[t.damageLevel - 1]);
        t.el.classList.add("qa-shield-restored");
        setTimeout(function () {
          t.el.classList.remove("qa-shield-restored");
        }, 500);
        // Reparar también baja el contador de "Impactados": ya no queda
        // pendiente ese incidente.
        self.bugsImpacted = Math.max(0, self.bugsImpacted - 1);
      }
    });
    this.updateHud();
  };

  /* ---------------- Loop principal ---------------- */

  QAGame.prototype.loop = function (ts) {
    if (!this.active) return;
    var dt = Math.min((ts - this.lastTs) / 1000, 0.05);
    this.lastTs = ts;

    try {
      this.update(dt);
      this.render();
    } catch (err) {
      // Cualquier error inesperado cierra el juego de forma segura en vez
      // de dejar el canvas trabado y el scroll bloqueado para siempre.
      console.error("QA Defense: error en el loop, cerrando de forma segura.", err);
      this.stop();
      return;
    }

    this.rafId = requestAnimationFrame(this.loop.bind(this));
  };

  QAGame.prototype.resolveHudCollision = function () {
    var hr = this.hudRect;
    if (!hr) return;
    var ship = this.ship;
    var margin = 16; // "radio" aproximado de la nave
    var left = hr.left - margin;
    var right = hr.right + margin;
    var top = hr.top - margin;
    var bottom = hr.bottom + margin;

    if (ship.x < left || ship.x > right || ship.y < top || ship.y > bottom) return;

    var distLeft = ship.x - left;
    var distRight = right - ship.x;
    var distTop = ship.y - top;
    var distBottom = bottom - ship.y;
    var minDist = Math.min(distLeft, distRight, distTop, distBottom);

    if (minDist === distLeft) {
      ship.x = left;
      ship.vx = -Math.abs(ship.vx) * 0.4 - 20;
    } else if (minDist === distRight) {
      ship.x = right;
      ship.vx = Math.abs(ship.vx) * 0.4 + 20;
    } else if (minDist === distTop) {
      ship.y = top;
      ship.vy = -Math.abs(ship.vy) * 0.4 - 20;
    } else {
      ship.y = bottom;
      ship.vy = Math.abs(ship.vy) * 0.4 + 20;
    }
  };

  QAGame.prototype.update = function (dt) {
    if (this.ended) return;

    var ship = this.ship;
    var ROT_SPEED = 3.4;
    var THRUST = 260;
    var FRICTION = 0.991;

    if (this.keys["a"] || this.keys["arrowleft"]) ship.angle -= ROT_SPEED * dt;
    if (this.keys["d"] || this.keys["arrowright"]) ship.angle += ROT_SPEED * dt;
    if (this.keys["w"] || this.keys["arrowup"]) {
      ship.vx += Math.cos(ship.angle) * THRUST * dt;
      ship.vy += Math.sin(ship.angle) * THRUST * dt;
    }
    if (this.keys["s"] || this.keys["arrowdown"]) {
      ship.vx -= Math.cos(ship.angle) * THRUST * 0.6 * dt;
      ship.vy -= Math.sin(ship.angle) * THRUST * 0.6 * dt;
    }

    ship.vx *= Math.pow(FRICTION, dt * 60);
    ship.vy *= Math.pow(FRICTION, dt * 60);
    ship.x += ship.vx * dt;
    ship.y += ship.vy * dt;

    var w = window.innerWidth;
    var h = window.innerHeight;
    if (ship.x < 0) ship.x = w;
    if (ship.x > w) ship.x = 0;
    if (ship.y < 0) ship.y = h;
    if (ship.y > h) ship.y = 0;

    this.resolveHudCollision();

    // Cobertura: decae con el tiempo (deuda técnica) y con cada disparo.
    this.coverage = clamp(this.coverage - dt * 0.9, 0, 99);
    this.testCases = Math.max(0, this.testCases - dt * 0.4);

    var nowTs = performance.now();
    this.shotTimestamps = this.shotTimestamps.filter(function (t) {
      return nowTs - t < 2000;
    });

    // Bullets
    var self = this;
    this.bullets = this.bullets.filter(function (b) {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
      return b.life > 0 && b.x > -20 && b.x < w + 20 && b.y > -20 && b.y < h + 20;
    });

    this.bullets.forEach(function (b) {
      if (b.hit) return;
      for (var i = 0; i < self.targets.length; i++) {
        var t = self.targets[i];
        var r = t.rect;
        if (b.x >= r.left && b.x <= r.right && b.y >= r.top && b.y <= r.bottom) {
          b.hit = true;
          if (b.kind === "cicd") {
            self.handleCicdHit(t, b.x, b.y);
          } else {
            self.handleHit(t, b.x, b.y);
          }
          break;
        }
      }
    });
    this.bullets = this.bullets.filter(function (b) {
      return !b.hit;
    });

    // Particles
    this.particles = this.particles.filter(function (p) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      return p.life > 0;
    });

    // Si el sistema se recuperó por completo (salud 100%, viniendo de
    // haber estado dañado), arrancamos de cero los contadores de
    // impacto: reflejan el incidente actual, no un acumulado sin fin.
    if (this.health >= 100 && this.prevHealth < 100) {
      this.resetBattleCounters();
    }
    this.prevHealth = this.health;

    // Condición de derrota: el sistema queda caído (salud 0%) de forma
    // sostenida, sin que se lo repare a tiempo.
    if (this.health <= 0) {
      this.zeroHealthTimer += dt;
      if (this.zeroHealthTimer >= LOSE_HOLD_SECONDS) {
        this.endGame(false);
        this.updateHud();
        return;
      }
    } else {
      this.zeroHealthTimer = 0;
    }

    // Condición de victoria: sostener el sistema en pie el tiempo objetivo.
    this.elapsed += dt;
    if (this.elapsed >= WIN_TIME_SECONDS) {
      this.endGame(true);
      this.updateHud();
      return;
    }

    this.updateHud();
  };

  QAGame.prototype.resetBattleCounters = function () {
    this.featuresLaunched = 0;
    this.bugsBlocked = 0;
    this.bugsImpacted = 0;
    this.shotTimestamps = [];
    this.floatText(
      window.innerWidth / 2,
      150,
      "✓ Sistema recuperado — contadores reiniciados",
      "cicd"
    );
  };

  QAGame.prototype.endGame = function (won) {
    if (this.ended) return;
    this.ended = true;

    var self = this;
    var modal = document.createElement("div");
    modal.className = "qa-end-modal";
    modal.innerHTML = won
      ? '<div class="qa-end-card win">' +
        "<h2>🏆 Sistema en producción, estable</h2>" +
        "<p>Sostuviste la cobertura y la salud del sistema durante " +
        WIN_TIME_SECONDS +
        " segundos bajo presión constante de features. Así se ve un buen pipeline de QA.</p>" +
        '<div class="qa-end-actions">' +
        '<button type="button" class="qa-hud-btn" data-qa-retry>Jugar de nuevo</button>' +
        '<button type="button" class="qa-hud-btn exit" data-qa-quit>Salir</button>' +
        "</div>" +
        "</div>"
      : '<div class="qa-end-card lose">' +
        "<h2>💥 Sistema caído — Game Over</h2>" +
        "<p>La deuda técnica ganó esta vez: la salud del sistema quedó en 0% sin repararse a tiempo. Reforzá el QA antes de que la próxima épica te vuelva a agarrar desprevenido.</p>" +
        '<div class="qa-end-actions">' +
        '<button type="button" class="qa-hud-btn" data-qa-retry>Reintentar</button>' +
        '<button type="button" class="qa-hud-btn exit" data-qa-quit>Salir</button>' +
        "</div>" +
        "</div>";

    this.overlay.appendChild(modal);

    modal.querySelector("[data-qa-retry]").addEventListener("click", function () {
      self.stop();
      self.start();
    });
    modal.querySelector("[data-qa-quit]").addEventListener("click", function () {
      self.stop();
    });
  };

  QAGame.prototype.shoot = function () {
    var now = performance.now();
    if (now - this.lastShotAt < 170) return;
    this.lastShotAt = now;

    var ship = this.ship;
    var speed = 480;
    this.bullets.push({
      x: ship.x + Math.cos(ship.angle) * 18,
      y: ship.y + Math.sin(ship.angle) * 18,
      vx: Math.cos(ship.angle) * speed + ship.vx,
      vy: Math.sin(ship.angle) * speed + ship.vy,
      life: 1.4,
      kind: "feature",
    });
    this.featuresLaunched++;

    // Ráfaga: mandar muchas features en poco tiempo (una "épica" sin
    // tests que la acompañen) degrada la cobertura mucho más rápido que
    // un feature aislado y espaciado en el tiempo.
    this.shotTimestamps.push(now);
    this.shotTimestamps = this.shotTimestamps.filter(function (t) {
      return now - t < 2000;
    });

    var burstCount = this.shotTimestamps.length;
    var decay = 1.1;
    if (burstCount > BURST_THRESHOLD) {
      decay += (burstCount - BURST_THRESHOLD) * 1.8;
      if (now - this.lastBurstWarnAt > 900) {
        this.lastBurstWarnAt = now;
        this.floatText(ship.x, ship.y - 30, "⚠ Nueva Issue Épica sin tests — deuda técnica", "warn");
      }
    }
    this.coverage = clamp(this.coverage - decay, 0, 99);
  };

  QAGame.prototype.shootCicd = function () {
    var now = performance.now();
    if (now - this.lastCicdAt < 650) return;
    this.lastCicdAt = now;

    var ship = this.ship;
    var speed = 380;
    this.bullets.push({
      x: ship.x + Math.cos(ship.angle) * 18,
      y: ship.y + Math.sin(ship.angle) * 18,
      vx: Math.cos(ship.angle) * speed + ship.vx,
      vy: Math.sin(ship.angle) * speed + ship.vy,
      life: 1.4,
      kind: "cicd",
    });
  };

  QAGame.prototype.handleHit = function (target, x, y) {
    var absorbed = this.coverage >= 55;

    if (absorbed) {
      this.bugsBlocked++;
      this.floatText(x, y, pick(PASS_PHRASES), "pass");
      this.spawnBurst(x, y, "rgba(95, 201, 141, 0.9)");
    } else {
      this.bugsImpacted++;
      this.health = clamp(this.health - 4, 0, 100);
      this.applyDamage(target);
      this.spawnBurst(x, y, "rgba(217, 119, 87, 0.9)");
      if (this.bugsImpacted % 3 === 0) {
        var overlayEl = this.overlay;
        overlayEl.classList.add("qa-screen-shake");
        setTimeout(function () {
          overlayEl.classList.remove("qa-screen-shake");
        }, 420);
      }
    }
  };

  QAGame.prototype.handleCicdHit = function (target, x, y) {
    this.coverage = clamp(this.coverage + 5, 0, 99);
    this.health = clamp(this.health + 8, 0, 100);
    this.testCases += 2;
    this.floatText(x, y, pick(CICD_PHRASES), "cicd");
    this.spawnBurst(x, y, "rgba(127, 166, 201, 0.9)");

    if (target.damageLevel > 0) {
      target.el.classList.remove(DAMAGE_CLASSES[target.damageLevel - 1]);
      target.damageLevel = Math.max(0, target.damageLevel - 1);
      target.hits = Math.max(0, target.hits - 2);
      if (target.damageLevel > 0) target.el.classList.add(DAMAGE_CLASSES[target.damageLevel - 1]);
      this.bugsImpacted = Math.max(0, this.bugsImpacted - 1);
    }
    target.el.classList.add("qa-shield-restored");
    setTimeout(function () {
      target.el.classList.remove("qa-shield-restored");
    }, 500);
  };

  QAGame.prototype.applyDamage = function (target) {
    target.hits++;
    var level = target.damageLevel;
    var newLevel = level;
    if (target.hits >= 7) newLevel = 3;
    else if (target.hits >= 4) newLevel = 2;
    else if (target.hits >= 2) newLevel = 1;

    if (newLevel !== level) {
      if (level > 0) target.el.classList.remove(DAMAGE_CLASSES[level - 1]);
      if (newLevel > 0) target.el.classList.add(DAMAGE_CLASSES[newLevel - 1]);
      target.damageLevel = newLevel;
    }

    target.el.classList.remove("qa-hit-shake");
    // forzar reflow para poder re-disparar la animación en hits consecutivos
    void target.el.offsetWidth;
    target.el.classList.add("qa-hit-shake");
  };

  QAGame.prototype.spawnBurst = function (x, y, color) {
    for (var i = 0; i < 10; i++) {
      var a = rand(0, Math.PI * 2);
      var s = rand(60, 220);
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life: rand(0.25, 0.5),
        maxLife: 0.5,
        color: color,
      });
    }
  };

  QAGame.prototype.floatText = function (x, y, text, cls) {
    var el = document.createElement("div");
    el.className = "qa-float " + cls;
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(function () {
      el.remove();
    }, 1150);
  };

  /* ---------------- Render ---------------- */

  QAGame.prototype.render = function () {
    var ctx = this.ctx;
    var w = this.canvas.width;
    var h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Shield rings sutiles sobre targets con cobertura alta
    if (this.coverage >= 55) {
      ctx.strokeStyle = "rgba(95, 201, 141, 0.18)";
      ctx.lineWidth = 1;
      this.targets.forEach(function (t) {
        var r = t.rect;
        ctx.strokeRect(r.left - 2, r.top - 2, r.width + 4, r.height + 4);
      });
    }

    // Bullets
    this.bullets.forEach(function (b) {
      ctx.fillStyle = b.kind === "cicd" ? "#7fa6c9" : "#f2efe6";
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.kind === "cicd" ? 3.4 : 2.4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Particles
    this.particles.forEach(function (p) {
      var alpha = clamp(p.life / p.maxLife, 0, 1);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Ship
    var ship = this.ship;
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    ctx.strokeStyle = this.coverage >= 55 ? "#5fc98d" : "#d97757";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(14, 0);
    ctx.lineTo(-10, 8);
    ctx.lineTo(-6, 0);
    ctx.lineTo(-10, -8);
    ctx.closePath();
    ctx.stroke();
    if (this.keys["w"] || this.keys["arrowup"]) {
      ctx.strokeStyle = "rgba(220, 174, 103, 0.9)";
      ctx.beginPath();
      ctx.moveTo(-6, 0);
      ctx.lineTo(-16 - rand(0, 6), 0);
      ctx.stroke();
    }
    ctx.restore();
  };

  /* ---------------- HUD ---------------- */

  QAGame.prototype.updateHud = function () {
    if (!this.hud) return;
    var covFill = this.hud.querySelector("[data-qa-coverage-fill]");
    var covVal = this.hud.querySelector("[data-qa-coverage-value]");
    var healthFill = this.hud.querySelector("[data-qa-health-fill]");
    var healthVal = this.hud.querySelector("[data-qa-health-value]");

    var cov = Math.round(this.coverage);
    covFill.style.width = cov + "%";
    covFill.style.background =
      cov >= 66 ? "var(--accent-pass)" : cov >= 33 ? "var(--accent-warn)" : "var(--qa-danger)";
    covVal.textContent = cov + "%";

    var hp = Math.round(this.health);
    healthFill.style.width = hp + "%";
    healthFill.style.background =
      hp >= 66 ? "var(--accent-pass)" : hp >= 33 ? "var(--accent-warn)" : "var(--qa-danger)";
    healthVal.textContent = hp + "%";

    this.hud.querySelector("[data-qa-tc]").textContent = Math.round(this.testCases);
    this.hud.querySelector("[data-qa-features]").textContent = this.featuresLaunched;
    this.hud.querySelector("[data-qa-blocked]").textContent = this.bugsBlocked;
    this.hud.querySelector("[data-qa-impacted]").textContent = this.bugsImpacted;

    var elapsedInt = Math.min(WIN_TIME_SECONDS, Math.floor(this.elapsed || 0));
    var mm = Math.floor(elapsedInt / 60);
    var ss = elapsedInt % 60;
    this.hud.querySelector("[data-qa-timer]").textContent =
      mm + ":" + (ss < 10 ? "0" : "") + ss;

    var restantes = Math.max(0, BURST_THRESHOLD - this.shotTimestamps.length + 1);
    var burstEl = this.hud.querySelector("[data-qa-burst]");
    burstEl.textContent = restantes;
    burstEl.style.color = restantes <= 1 ? "var(--qa-danger)" : "var(--text-primary)";

    var statusEl = this.hud.querySelector("[data-qa-system-status]");
    statusEl.classList.remove("estable", "degradado", "caido");
    if (hp <= 0) {
      statusEl.textContent = "⚠ CAÍDO — reforzá el QA para recuperarlo";
      statusEl.classList.add("caido");
    } else if (hp < 50 || cov < 50) {
      statusEl.textContent = "DEGRADADO";
      statusEl.classList.add("degradado");
    } else {
      statusEl.textContent = "ESTABLE";
      statusEl.classList.add("estable");
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    new QAGame().init();
  });
})();
