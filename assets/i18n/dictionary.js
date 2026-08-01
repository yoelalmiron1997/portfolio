/* ============================================================
   Diccionario de traducciones ES/EN — portfolio de Yoel Almirón.

   Un solo archivo para todo el sitio (index + páginas de detalle
   de proyecto + el juego QA Defense), namespaced por página para
   evitar colisiones de claves.
   ============================================================ */
window.I18N = {
  es: {
    /* ---------- index.html: meta ---------- */
    "meta.title": "Yoel Almirón — Tester de Software",
    "meta.description":
      "Portfolio de Yoel Almirón, tester de software e Ingeniero en Sistemas de Información. Testing manual y automatizado, automatización con Robot Framework y Python, validación de APIs.",

    /* ---------- index.html: nav ---------- */
    "nav.about": "sobre-mi",
    "nav.tech": "tecnologias",
    "nav.projects": "proyectos",
    "nav.education": "formacion",
    "nav.contact": "contacto",

    /* ---------- index.html: hero ---------- */
    "hero.kicker": "Ingeniero en Sistemas de Información · Software QA Engineer",
    "hero.title": "Testing, automatización y calidad de software",
    "hero.lead":
      "En este portfolio comparto proyectos que reflejan mi forma de trabajar como QA. Cada uno combina análisis, diseño de pruebas, automatización y documentación para validar el comportamiento de sistemas y generar evidencia clara sobre su calidad.",
    "hero.btnExplore": "Explorar proyectos",

    /* ---------- index.html: sobre mí ---------- */
    "about.label": "Sobre<br />mí",
    "about.p1":
      "Soy Ingeniero en Sistemas de Información con experiencia en QA Manual y Automation. A lo largo de mi carrera he participado en pruebas funcionales, de integración y automatizadas, investigando incidencias y colaborando con equipos de desarrollo para mejorar la calidad del software.",
    "about.p2":
      "Disfruto analizar cómo interactúan los sistemas, construir herramientas que faciliten el proceso de testing y seguir aprendiendo nuevas tecnologías para crear soluciones cada vez más robustas.",

    /* ---------- index.html: tecnologías ---------- */
    "tech.eyebrow": "stack",
    "tech.title": "Tecnologías",

    /* ---------- index.html: proyectos ---------- */
    "projects.eyebrow": "portfolio",
    "projects.title": "Proyectos",
    "projects.desc": "Selección de proyectos. El portfolio crece de forma gradual (Actualizaremos).",

    /* ---------- index.html: formación ---------- */
    "edu.eyebrow": "formación",
    "edu.title": "Formación",
    "edu.utn.title": "Ingeniero en Sistemas de Información",
    "edu.utn.desc":
      "Formación de grado en Ingeniería en Sistemas de Información, Universidad Tecnológica Nacional, Facultad Regional La Plata.",
    "edu.udemy.desc":
      "Formación orientada a profundizar el diseño, organización y mantenimiento de pruebas automatizadas con Robot Framework. Dictado por Bryan Lamb (Udemy), 5 horas, completado en julio de 2026.",
    "edu.udemy.cert": "Ver certificado",
    "edu.codapli.title": "Becario de Investigación — Práctica Supervisada",
    "edu.codapli.desc":
      "Práctica supervisada como becario en el Centro de Investigación CODAPLI (UTN FRLP). Diseñé e implementé un sistema de sincronización inteligente de semáforos mediante visión artificial (Haar Cascade, OpenCV, Raspberry Pi), presentado en CONAIISI (Congreso Nacional de Ingeniería en Sistemas de Información).",
    "edu.codapli.project": "Ver proyecto",
    "edu.python.source": "Capacitación laboral",
    "edu.python.desc":
      "Fundamentos del lenguaje Python aplicados a scripting y automatización, adquiridos mediante una capacitación laboral orientada a testing.",
    "edu.linux.source": "Curso",
    "edu.linux.desc":
      "Administración básica de sistemas Linux: línea de comandos, permisos y gestión de procesos.",

    /* ---------- index.html: contacto / footer ---------- */
    "contact.eyebrow": "contacto",
    "contact.title": "¿Hablamos sobre testing?",
    "footer.build": "build: static ",

    /* ---------- Tarjetas de proyecto (script.js) ---------- */
    "project.link.detail": "Detalle",
    "project.link.repo": "Repositorio",
    "project.link.deploy": "Deploy",
    "project.status.done": "Finalizado",
    "project.status.courseDone": "Curso finalizado",
    "project.link.pending": "(pendiente)",

    /* ---------- Nav / secciones compartidas de las páginas de detalle ---------- */
    "nav.back": "← volver al portfolio",
    "detail.context": "Contexto",
    "detail.objective": "Objetivo",
    "detail.architecture": "Arquitectura",
    "detail.testing": "Testing",
    "detail.technologies": "Tecnologías",
    "detail.evidence": "Evidencia",
    "detail.result": "Resultado",
    "detail.learnings": "Aprendizajes",
    "detail.risks": "Riesgos considerados",
    "detail.strategy": "Estrategia de pruebas",
    "detail.highlightedCases": "Casos de prueba destacados",
    "detail.viewRepo": "Ver repositorio",
    "detail.repo": "Repositorio",
    "detail.deploy": "Deploy",
    "detail.viewLiveDemo": "Ver demo en vivo",
    "detail.evidencePending": "Evidencia pendiente de publicación",

    /* ---------- ARSAT ---------- */
    "arsat.meta.title": "Simulador de Telemetría Satelital ARSAT — Yoel Almirón",
    "arsat.meta.description":
      "Proyecto educativo de simulación de telemetría satelital con Python, MQTT, Prometheus, Grafana, Docker y Robot Framework.",
    "arsat.hero.title": "Simulador de Telemetría Satelital ARSAT",
    "arsat.hero.lead":
      "Simulación educativa de una arquitectura de telemetría satelital, comunicaciones y observabilidad en tiempo real mediante Python, MQTT, Prometheus y Grafana.",
    "arsat.hero.viewDemo": "Ver demo en vivo",
    "arsat.detail.context":
      "Proyecto educativo orientado a representar, de forma simplificada, la arquitectura de telemetría, comunicaciones y monitoreo utilizada en sistemas satelitales.",
    "arsat.detail.objective":
      "Reproducir el ciclo completo de la telemetría: desde la generación de datos por los subsistemas simulados del satélite hasta su transmisión, recepción, procesamiento y visualización en una estación terrena.",
    "arsat.detail.architecture":
      "El sistema utiliza una arquitectura basada en microservicios y comunicación Publish/Subscribe. Los subsistemas simulados generan telemetría en Python, MQTT actúa como enlace de comunicación y una Ground Station procesa los datos antes de exponer las métricas hacia Prometheus y Grafana.",
    "arsat.detail.telemetryFlowTitle": "Flujo de telemetría",
    "arsat.detail.telemetryFlow":
      "Los subsistemas EPS, TCS, AOCS y Payload generan datos simulados del satélite. La información se empaqueta como tramas de telemetría, se transmite mediante MQTT y posteriormente es decodificada por la estación terrena para su monitoreo en tiempo real.",
    "arsat.detail.anomalyTitle": "Simulación de anomalías",
    "arsat.detail.anomaly":
      "El entorno permite generar fallas controladas, como caídas de tensión o cambios anormales en parámetros del satélite, permitiendo observar cómo las anomalías se reflejan automáticamente en los dashboards del centro de control.",
    "arsat.detail.observabilityTitle": "Observabilidad",
    "arsat.detail.observability":
      "Prometheus recopila las métricas generadas por el sistema mientras Grafana permite visualizar el estado de los subsistemas, identificar anomalías y seguir la posición orbital simulada mediante un panel de monitoreo tipo Mission Control.",
    "arsat.detail.testing":
      "Suite de testing automatizado en 4 niveles: <b>smoke</b> (Pytest, chequeo de salud de los 7 servicios), <b>API</b> (Pytest, contrato del endpoint de métricas), <b>integración</b> (Robot Framework, flujo end-to-end determinista MQTT → Ground Station → Prometheus con tramas conocidas) y <b>regresión / fault injection</b> (Pytest, verifica que las alertas de Prometheus se disparen y se recuperen ante anomalías reales inyectadas). Corre automáticamente en cada push vía GitHub Actions.",
    "arsat.detail.evidence":
      'Pipeline de CI/CD público con los 4 suites de testing corriendo en cada push — ver el <a href="https://github.com/yoelalmiron1997/arsat-telemetry-simulator/actions/workflows/ci.yml" target="_blank" rel="noopener noreferrer">historial de ejecuciones</a> en GitHub Actions. El dashboard de Grafana con una anomalía real capturada está disponible en el <a href="https://snapshots.raintank.io/dashboard/snapshot/PQ49MNRfXkyY8Il9dfPuyUodAw8nV3GQ?orgId=0&from=2026-07-22T14:42:19.854Z&to=2026-07-22T15:12:19.854Z&timezone=browser&refresh=5s" target="_blank" rel="noopener noreferrer">demo en vivo</a>.',
    "arsat.detail.result":
      "Un entorno reproducible y dockerizado capaz de simular generación, transmisión y procesamiento de telemetría satelital, incluyendo monitoreo en tiempo real, rastreo orbital y detección visual de anomalías.",
    "arsat.detail.learnings":
      "Este proyecto permitió integrar conceptos de sistemas distribuidos, arquitectura orientada a eventos, protocolos de comunicación, observabilidad, automatización de pruebas y despliegue de servicios mediante contenedores.",

    /* ---------- Healthcare FHIR ---------- */
    "fhir.meta.title": "Healthcare FHIR Integration Testing — Yoel Almirón",
    "fhir.meta.description":
      "Validación de integraciones de sistemas de salud mediante recursos FHIR, pruebas de API y documentación de evidencia.",
    "fhir.hero.lead":
      "Validación de integraciones de sistemas de salud mediante recursos FHIR, pruebas de API y documentación de evidencia.",
    "fhir.detail.context":
      "Los sistemas de salud intercambian información clínica mediante el estándar FHIR (Fast Healthcare Interoperability Resources). Validar que estos recursos se generan, transmiten y consumen correctamente entre sistemas es una condición necesaria para la calidad de cualquier integración clínica.",
    "fhir.detail.objective":
      "Diseñar y ejecutar un conjunto de pruebas automatizadas que validen la estructura, el contenido y el comportamiento de una integración basada en recursos FHIR (Patient, Observation, Encounter), documentando la evidencia obtenida en cada corrida.",
    "fhir.detail.risks":
      "Recursos FHIR mal formados o incompletos, pérdida de trazabilidad entre identificadores de paciente, respuestas de API que no respetan el esquema esperado, y falta de evidencia reproducible ante un fallo de integración.",
    "fhir.detail.strategy":
      "Pruebas de API sobre los endpoints del servidor FHIR, validación de esquema de cada recurso, casos negativos ante datos inválidos y verificación de códigos de estado y payloads de respuesta con Robot Framework y la librería de peticiones HTTP.",
    "fhir.detail.evidence":
      'La API está desplegada y accesible públicamente, con su documentación interactiva Swagger/OpenAPI generada en vivo a partir de los propios endpoints. Ver la <a href="https://healthcare-fhir-api.onrender.com/docs" target="_blank" rel="noopener noreferrer">documentación de la API en vivo</a>.',
    "fhir.detail.learnings":
      "Trabajar con estándares clínicos exige pruebas más estrictas sobre la forma de los datos, no solo sobre el comportamiento funcional: validar un recurso FHIR es, en gran parte, validar contratos de datos.",

    /* ---------- AI QA Testing Agent ---------- */
    "aiqa.meta.title": "AI QA Testing Agent Platform — Yoel Almirón",
    "aiqa.meta.description":
      "Agente de IA autónomo para testing de APIs REST: análisis de riesgo, generación de casos de prueba y diagnóstico de defectos.",
    "aiqa.hero.lead":
      "Plataforma que analiza especificaciones REST API documentadas con OpenAPI/Swagger, evalúa el riesgo de cada endpoint, genera casos de prueba en 9 dimensiones, los ejecuta con aserciones HTTP reales y diagnostica defectos con razonamiento de causa raíz.",
    "aiqa.detail.context":
      "Analizar manualmente el riesgo de cada endpoint de una API y diseñar casos de prueba que cubran los distintos escenarios (funcionales, de borde, de seguridad, de payload inválido) es un trabajo repetitivo que escala mal a medida que crece una especificación OpenAPI. Este proyecto explora hasta qué punto ese análisis de riesgo y diseño de casos puede automatizarse a partir de la especificación misma.",
    "aiqa.detail.objective":
      "Construir una plataforma que reciba una especificación OpenAPI/Swagger (2.0, 3.0 o 3.1), evalúe automáticamente el riesgo de cada endpoint, genere casos de prueba priorizados, los ejecute contra la API real y produzca un reporte de evidencia con diagnóstico de causa raíz ante cada falla.",
    "aiqa.detail.risks":
      "Endpoints de mutación de datos (POST/PUT/DELETE) sin cobertura de negativos, ausencia de validación de autenticación/autorización, payloads malformados o con tipos de dato incorrectos, y falta de trazabilidad entre una falla HTTP y su causa técnica real.",
    "aiqa.detail.strategy":
      "El agente clasifica cada endpoint como riesgo <b>HIGH</b>, <b>MEDIUM</b> o <b>LOW</b> según su sensibilidad y método HTTP, y genera casos en 9 dimensiones: funcional (camino feliz), límites, negativos (404), seguridad (sin token), autorización (token inválido/expirado), payload inválido, campos faltantes, payload masivo y tipos de dato inesperados. Cada caso se ejecuta con peticiones HTTP reales, midiendo tiempo de respuesta, código de estado y esquema de la respuesta.",
    "aiqa.detail.diagnosisTitle": "Diagnóstico de defectos",
    "aiqa.detail.diagnosis":
      "Ante cualquier falla o código de respuesta inesperado, el agente realiza un análisis de causa raíz automatizado, asignando un nivel de confianza (HIGH/MEDIUM/LOW), explicando el mecanismo de la falla y sugiriendo una recomendación concreta para el equipo de desarrollo.",
    "aiqa.detail.evidence":
      'La plataforma está desplegada y accesible públicamente; cualquier especificación OpenAPI puede cargarse en vivo para generar un reporte real de riesgo, casos de prueba y ejecución. Ver <a href="https://ai-qa-testing-agent.onrender.com" target="_blank" rel="noopener noreferrer">demo en vivo</a> y <a href="https://ai-qa-testing-agent.onrender.com/api/v1/docs" target="_blank" rel="noopener noreferrer">documentación Swagger</a>.',
    "aiqa.detail.result":
      "Una plataforma end-to-end que reduce el análisis manual de riesgo y diseño de casos de prueba de una especificación OpenAPI a un proceso automatizado y repetible, con reportes HTML y Markdown listos para compartir como evidencia.",
    "aiqa.detail.learnings":
      "Diseñar prompts y heurísticas de clasificación de riesgo confiables exige pensar primero como QA (qué haría manualmente y por qué) antes de automatizarlo — el agente es, en esencia, una checklist de análisis de riesgo convertida en código.",

    /* ---------- Robot Framework Linux Integration Suite ---------- */
    "rlis.meta.title": "Robot Framework Linux Integration Testing — Yoel Almirón",
    "rlis.meta.description":
      "Suite de pruebas de integración con Robot Framework para validar el ciclo de vida completo de un servicio Linux empaquetado como .deb.",
    "rlis.hero.lead":
      "Suite automatizada de pruebas de integración para validar el ciclo de vida completo de un servicio Linux distribuido como paquete Debian (<code>.deb</code>): instalación, arranque, actualización, logs, recuperación ante fallas y remoción limpia.",
    "rlis.detail.context":
      "El software distribuido a sistemas Linux empresariales suele empaquetarse como binarios Debian (<code>.deb</code>). Validar estos paquetes exige más que un test de API o de interfaz web: requiere verificar estados de instalación, scripts de pre/post instalación, ubicación de archivos, ciclo de vida del servicio, persistencia de la configuración entre actualizaciones y una desinstalación limpia sin archivos huérfanos.",
    "rlis.detail.objective":
      "Construir una suite de integración end-to-end con Robot Framework que valide el ciclo de vida completo de un servicio Linux sintético (<code>satellite-telemetry</code>) empaquetado como <code>.deb</code>: desde la instalación limpia hasta la remoción, pasando por arranque, actualización in-place y recuperación ante fallas.",
    "rlis.detail.risks":
      "Dependencias declaradas incorrectamente, archivos de configuración corruptos que deberían impedir el arranque del servicio, pérdida de configuraciones personalizadas del usuario tras una actualización, archivos huérfanos tras una desinstalación, y falta de recuperación del servicio ante una terminación abrupta del proceso.",
    "rlis.detail.strategy":
      "15 casos de prueba agrupados en 6 categorías: instalación, dependencias, configuración, ciclo de vida del servicio, actualización y remoción. Cada caso usa una librería custom de Robot Framework en Python (<code>LinuxPackageLibrary.py</code>) que envuelve <code>dpkg</code>/<code>dpkg-query</code>, control POSIX de servicios y peticiones HTTP reales contra el endpoint de salud del servicio.",
    "rlis.detail.casesNote":
      'El detalle completo de los 15 casos (TC-001 a TC-015) está documentado en el <a href="https://github.com/yoelalmiron1997/robot-linux-integration-suite#casos-de-prueba" target="_blank" rel="noopener noreferrer">README del repositorio</a>.',
    "rlis.detail.evidence":
      'Cada corrida de CI empaqueta las versiones 1.0.0 y 1.1.0, ejecuta los 15 casos con permisos de root dentro de un contenedor Ubuntu/Debian, y publica <code>report.html</code>, <code>log.html</code> y <code>output.xml</code> como artifacts descargables. Ver el <a href="https://github.com/yoelalmiron1997/robot-linux-integration-suite/actions/workflows/robot-tests.yml" target="_blank" rel="noopener noreferrer">historial de ejecuciones</a>.',
    "rlis.detail.result":
      "Una suite reproducible con Docker que valida no solo el comportamiento funcional del servicio, sino también la integridad del paquete y su ciclo de vida completo como lo haría un equipo de QA validando un release antes de su distribución.",
    "rlis.detail.learnings":
      "Probar a nivel de sistema operativo (instalación, servicios, señales POSIX) exige diseñar keywords de Robot Framework que abstraigan comandos de shell sin perder precisión sobre qué se está validando en cada paso — la trazabilidad entre keyword y comando real es tan importante como el resultado final.",

    /* ---------- Selenium Portfolio 3D ---------- */
    "sel.meta.title": "Selenium 4 QA & Scraping Portfolio — Yoel Almirón",
    "sel.meta.description":
      "Suite de automatización E2E con Selenium 4 y Pytest (Page Object Model) sobre un comparador de precios de impresión 3D, con bot de web scraping y CI/CD.",
    "sel.hero.lead":
      "Suite de automatización E2E con Selenium 4 y Pytest sobre un comparador de precios de impresión 3D (búsqueda, filtros por categoría, ordenamiento por precio), más un bot de web scraping que alimenta los datos del sitio. Deploy y reporte de pruebas publicados automáticamente vía GitHub Actions.",
    "sel.hero.viewReport": "Reporte de pruebas HTML",
    "sel.detail.context":
      "Un sitio de comparación de precios necesita, además de mostrar datos, garantizar que la búsqueda, el filtrado y el ordenamiento funcionen de forma confiable ante cambios en el catálogo — justamente el tipo de flujo de usuario que rompe silenciosamente cuando se modifica el frontend sin cobertura de pruebas E2E.",
    "sel.detail.objective":
      "Construir una suite de automatización E2E con Selenium 4 y Pytest, organizada con el patrón Page Object Model, que valide los flujos críticos de un comparador de precios de impresión 3D, alimentado por un bot de web scraping propio, con despliegue y reporte de evidencia automatizados en cada push.",
    "sel.detail.risks":
      "Búsquedas que no filtran correctamente los resultados, filtros por categoría que devuelven productos de otra categoría, ordenamiento por precio inconsistente (ascendente/descendente), y búsquedas sin resultados que no limpian la grilla correctamente.",
    "sel.detail.strategy":
      "Suite Pytest con arquitectura Page Object Model (<code>HomePage</code> + <code>BasePage</code> con <code>WebDriverWait</code> explícito, sin <code>sleep</code> fijos innecesarios en la capa de aserciones). Casos cubren carga inicial de la home, búsqueda por texto, filtrado por categoría, ordenamiento ascendente/descendente por precio, y búsqueda sin resultados. Corre en modo headless en CI y también soporta modo visible para debugging local.",
    "sel.detail.evidence":
      'El sitio y el reporte de pruebas se despliegan automáticamente en cada push. Ver el <a href="https://yoelalmiron1997.github.io/selenium-portfolio-3d/" target="_blank" rel="noopener noreferrer">demo en vivo</a> y el <a href="https://yoelalmiron1997.github.io/selenium-portfolio-3d/reports/report.html" target="_blank" rel="noopener noreferrer">reporte HTML de la última corrida</a>.',
    "sel.detail.result":
      "Una suite E2E reproducible que corre en Chrome headless dentro de GitHub Actions, con evidencia de ejecución (reporte HTML + capturas de pantalla por test) publicada automáticamente, sin pasos manuales entre el push y el reporte visible.",
    "sel.detail.learnings":
      "Separar los <code>WebDriverWait</code> explícitos de los <code>time.sleep</code> usados para esperar animaciones del frontend deja mucho más claro, al leer un test que falla, si el problema es de sincronización o un cambio real de comportamiento.",
  },

  en: {
    /* ---------- index.html: meta ---------- */
    "meta.title": "Yoel Almirón — Software Tester",
    "meta.description":
      "Portfolio of Yoel Almirón, software tester and Information Systems Engineer. Manual and automated testing, automation with Robot Framework and Python, API validation.",

    /* ---------- index.html: nav ---------- */
    "nav.about": "about",
    "nav.tech": "tech-stack",
    "nav.projects": "projects",
    "nav.education": "education",
    "nav.contact": "contact",

    /* ---------- index.html: hero ---------- */
    "hero.kicker": "Information Systems Engineer · Software QA Engineer",
    "hero.title": "Testing, automation and software quality",
    "hero.lead":
      "In this portfolio I share projects that reflect how I work as a QA. Each one combines analysis, test design, automation and documentation to validate system behavior and produce clear evidence of its quality.",
    "hero.btnExplore": "Explore projects",

    /* ---------- index.html: about ---------- */
    "about.label": "About<br />me",
    "about.p1":
      "I'm an Information Systems Engineer with experience in Manual and Automation QA. Throughout my career I've worked on functional, integration and automated testing, investigating issues and collaborating with development teams to improve software quality.",
    "about.p2":
      "I enjoy analyzing how systems interact, building tools that make testing easier, and keeping up with new technologies to build increasingly robust solutions.",

    /* ---------- index.html: tech stack ---------- */
    "tech.eyebrow": "stack",
    "tech.title": "Tech Stack",

    /* ---------- index.html: projects ---------- */
    "projects.eyebrow": "portfolio",
    "projects.title": "Projects",
    "projects.desc": "Selected projects. The portfolio grows gradually (more coming soon).",

    /* ---------- index.html: education ---------- */
    "edu.eyebrow": "education",
    "edu.title": "Education",
    "edu.utn.title": "Information Systems Engineer",
    "edu.utn.desc":
      "Undergraduate degree in Information Systems Engineering, Universidad Tecnológica Nacional, Facultad Regional La Plata (Argentina).",
    "edu.udemy.desc":
      "Training focused on deepening the design, organization and maintenance of automated tests with Robot Framework. Taught by Bryan Lamb (Udemy), 5 hours, completed July 2026.",
    "edu.udemy.cert": "View certificate",
    "edu.codapli.title": "Research Fellow — Supervised Internship",
    "edu.codapli.desc":
      "Supervised internship as a research fellow at the CODAPLI Research Center (UTN FRLP, Argentina). Designed and implemented an intelligent traffic-light synchronization system using computer vision (Haar Cascade, OpenCV, Raspberry Pi), presented at CONAIISI (Argentina's National Congress of Information Systems Engineering).",
    "edu.codapli.project": "View project",
    "edu.python.source": "On-the-job training",
    "edu.python.desc":
      "Python fundamentals applied to scripting and automation, acquired through testing-focused on-the-job training.",
    "edu.linux.source": "Course",
    "edu.linux.desc":
      "Basic Linux system administration: command line, permissions and process management.",

    /* ---------- index.html: contact / footer ---------- */
    "contact.eyebrow": "contact",
    "contact.title": "Let's talk about testing",
    "footer.build": "build: static ",

    /* ---------- Project cards (script.js) ---------- */
    "project.link.detail": "Details",
    "project.link.repo": "Repository",
    "project.link.deploy": "Deploy",
    "project.status.done": "Completed",
    "project.status.courseDone": "Course completed",
    "project.link.pending": "(pending)",

    /* ---------- Nav / shared sections in detail pages ---------- */
    "nav.back": "← back to portfolio",
    "detail.context": "Context",
    "detail.objective": "Objective",
    "detail.architecture": "Architecture",
    "detail.testing": "Testing",
    "detail.technologies": "Technologies",
    "detail.evidence": "Evidence",
    "detail.result": "Result",
    "detail.learnings": "Learnings",
    "detail.risks": "Risks considered",
    "detail.strategy": "Testing strategy",
    "detail.highlightedCases": "Highlighted test cases",
    "detail.viewRepo": "View repository",
    "detail.repo": "Repository",
    "detail.deploy": "Deploy",
    "detail.viewLiveDemo": "View live demo",
    "detail.evidencePending": "Evidence pending publication",

    /* ---------- ARSAT ---------- */
    "arsat.meta.title": "ARSAT Satellite Telemetry Simulator — Yoel Almirón",
    "arsat.meta.description":
      "Educational satellite telemetry simulation project with Python, MQTT, Prometheus, Grafana, Docker and Robot Framework.",
    "arsat.hero.title": "ARSAT Satellite Telemetry Simulator",
    "arsat.hero.lead":
      "Educational simulation of a satellite telemetry, communications and real-time observability architecture using Python, MQTT, Prometheus and Grafana.",
    "arsat.hero.viewDemo": "View live demo",
    "arsat.detail.context":
      "Educational project aimed at representing, in a simplified way, the telemetry, communications and monitoring architecture used in satellite systems.",
    "arsat.detail.objective":
      "Reproduce the full telemetry cycle: from data generation by the satellite's simulated subsystems to transmission, reception, processing and visualization at a ground station.",
    "arsat.detail.architecture":
      "The system uses a microservices architecture with Publish/Subscribe communication. Simulated subsystems generate telemetry in Python, MQTT acts as the communication link, and a Ground Station processes the data before exposing metrics to Prometheus and Grafana.",
    "arsat.detail.telemetryFlowTitle": "Telemetry flow",
    "arsat.detail.telemetryFlow":
      "The EPS, TCS, AOCS and Payload subsystems generate simulated satellite data. The information is packaged as telemetry frames, transmitted via MQTT, and later decoded by the ground station for real-time monitoring.",
    "arsat.detail.anomalyTitle": "Anomaly simulation",
    "arsat.detail.anomaly":
      "The environment can generate controlled failures, such as voltage drops or abnormal changes in satellite parameters, letting you observe how anomalies are automatically reflected in the mission control dashboards.",
    "arsat.detail.observabilityTitle": "Observability",
    "arsat.detail.observability":
      "Prometheus collects the metrics generated by the system while Grafana visualizes subsystem status, identifies anomalies, and tracks the simulated orbital position through a Mission-Control-style monitoring panel.",
    "arsat.detail.testing":
      "A 4-level automated testing suite: <b>smoke</b> (Pytest, health check of the 7 services), <b>API</b> (Pytest, metrics endpoint contract), <b>integration</b> (Robot Framework, deterministic end-to-end MQTT → Ground Station → Prometheus flow with known frames), and <b>regression / fault injection</b> (Pytest, verifies Prometheus alerts fire and recover from real injected anomalies). Runs automatically on every push via GitHub Actions.",
    "arsat.detail.evidence":
      'Public CI/CD pipeline with the 4 test suites running on every push — see the <a href="https://github.com/yoelalmiron1997/arsat-telemetry-simulator/actions/workflows/ci.yml" target="_blank" rel="noopener noreferrer">run history</a> on GitHub Actions. The Grafana dashboard with a captured real anomaly is available in the <a href="https://snapshots.raintank.io/dashboard/snapshot/PQ49MNRfXkyY8Il9dfPuyUodAw8nV3GQ?orgId=0&from=2026-07-22T14:42:19.854Z&to=2026-07-22T15:12:19.854Z&timezone=browser&refresh=5s" target="_blank" rel="noopener noreferrer">live demo</a>.',
    "arsat.detail.result":
      "A reproducible, dockerized environment able to simulate satellite telemetry generation, transmission and processing, including real-time monitoring, orbital tracking and visual anomaly detection.",
    "arsat.detail.learnings":
      "This project brought together concepts from distributed systems, event-driven architecture, communication protocols, observability, test automation and container-based service deployment.",

    /* ---------- Healthcare FHIR ---------- */
    "fhir.meta.title": "Healthcare FHIR Integration Testing — Yoel Almirón",
    "fhir.meta.description":
      "Validation of healthcare system integrations via FHIR resources, API testing and evidence documentation.",
    "fhir.hero.lead":
      "Validation of healthcare system integrations via FHIR resources, API testing and evidence documentation.",
    "fhir.detail.context":
      "Healthcare systems exchange clinical information using the FHIR standard (Fast Healthcare Interoperability Resources). Validating that these resources are correctly generated, transmitted and consumed between systems is a necessary condition for the quality of any clinical integration.",
    "fhir.detail.objective":
      "Design and run a set of automated tests that validate the structure, content and behavior of a FHIR-resource-based integration (Patient, Observation, Encounter), documenting the evidence obtained on each run.",
    "fhir.detail.risks":
      "Malformed or incomplete FHIR resources, loss of traceability between patient identifiers, API responses that don't follow the expected schema, and lack of reproducible evidence in the event of an integration failure.",
    "fhir.detail.strategy":
      "API tests against the FHIR server endpoints, schema validation for each resource, negative cases with invalid data, and verification of status codes and response payloads using Robot Framework and its HTTP request library.",
    "fhir.detail.evidence":
      'The API is deployed and publicly accessible, with interactive Swagger/OpenAPI documentation generated live from the endpoints themselves. See the <a href="https://healthcare-fhir-api.onrender.com/docs" target="_blank" rel="noopener noreferrer">live API docs</a>.',
    "fhir.detail.learnings":
      "Working with clinical standards demands stricter tests on data shape, not just functional behavior: validating a FHIR resource is, in large part, validating data contracts.",

    /* ---------- AI QA Testing Agent ---------- */
    "aiqa.meta.title": "AI QA Testing Agent Platform — Yoel Almirón",
    "aiqa.meta.description":
      "Autonomous AI agent for REST API testing: risk analysis, test case generation and defect diagnosis.",
    "aiqa.hero.lead":
      "A platform that analyzes REST API specs documented with OpenAPI/Swagger, scores the risk of each endpoint, generates test cases across 9 dimensions, executes them with real HTTP assertions, and diagnoses defects with root-cause reasoning.",
    "aiqa.detail.context":
      "Manually analyzing the risk of every API endpoint and designing test cases that cover the different scenarios (functional, edge, security, invalid payload) is repetitive work that scales poorly as an OpenAPI spec grows. This project explores how far that risk analysis and test design can be automated straight from the spec itself.",
    "aiqa.detail.objective":
      "Build a platform that receives an OpenAPI/Swagger spec (2.0, 3.0 or 3.1), automatically scores the risk of each endpoint, generates prioritized test cases, runs them against the real API, and produces an evidence report with root-cause diagnosis for every failure.",
    "aiqa.detail.risks":
      "Data-mutating endpoints (POST/PUT/DELETE) without negative-case coverage, missing authentication/authorization validation, malformed payloads or wrong data types, and lack of traceability between an HTTP failure and its real technical cause.",
    "aiqa.detail.strategy":
      "The agent classifies each endpoint as <b>HIGH</b>, <b>MEDIUM</b> or <b>LOW</b> risk based on its sensitivity and HTTP method, and generates cases across 9 dimensions: functional (happy path), boundaries, negatives (404), security (no token), authorization (invalid/expired token), invalid payload, missing fields, oversized payload, and unexpected data types. Each case runs with real HTTP requests, measuring response time, status code and response schema.",
    "aiqa.detail.diagnosisTitle": "Defect diagnosis",
    "aiqa.detail.diagnosis":
      "On any failure or unexpected response code, the agent runs an automated root-cause analysis, assigning a confidence level (HIGH/MEDIUM/LOW), explaining the failure mechanism, and suggesting a concrete recommendation for the development team.",
    "aiqa.detail.evidence":
      'The platform is deployed and publicly accessible; any OpenAPI spec can be loaded live to generate a real risk report, test cases and execution. See the <a href="https://ai-qa-testing-agent.onrender.com" target="_blank" rel="noopener noreferrer">live demo</a> and the <a href="https://ai-qa-testing-agent.onrender.com/api/v1/docs" target="_blank" rel="noopener noreferrer">Swagger docs</a>.',
    "aiqa.detail.result":
      "An end-to-end platform that turns the manual risk analysis and test-case design of an OpenAPI spec into an automated, repeatable process, with HTML and Markdown reports ready to share as evidence.",
    "aiqa.detail.learnings":
      "Designing reliable prompts and risk-classification heuristics requires thinking like a QA first (what would I do manually, and why) before automating it — the agent is, in essence, a risk-analysis checklist turned into code.",

    /* ---------- Robot Framework Linux Integration Suite ---------- */
    "rlis.meta.title": "Robot Framework Linux Integration Testing — Yoel Almirón",
    "rlis.meta.description":
      "Robot Framework integration test suite validating the full lifecycle of a Linux service packaged as a .deb.",
    "rlis.hero.lead":
      "Automated integration test suite validating the full lifecycle of a Linux service distributed as a Debian package (<code>.deb</code>): install, startup, upgrade, logs, failure recovery and clean removal.",
    "rlis.detail.context":
      "Software distributed to enterprise Linux systems is often packaged as Debian binaries (<code>.deb</code>). Validating these packages takes more than an API or web UI test: it requires checking install states, pre/post-install scripts, file locations, service lifecycle, config persistence across upgrades, and a clean uninstall with no orphaned files.",
    "rlis.detail.objective":
      "Build an end-to-end integration suite with Robot Framework validating the full lifecycle of a synthetic Linux service (<code>satellite-telemetry</code>) packaged as <code>.deb</code>: from clean install to removal, through startup, in-place upgrade, and failure recovery.",
    "rlis.detail.risks":
      "Incorrectly declared dependencies, corrupted config files that should prevent the service from starting, loss of user-customized configuration after an upgrade, orphaned files after uninstalling, and lack of service recovery after an abrupt process termination.",
    "rlis.detail.strategy":
      "15 test cases grouped into 6 categories: installation, dependencies, configuration, service lifecycle, upgrade and removal. Each case uses a custom Robot Framework Python library (<code>LinuxPackageLibrary.py</code>) wrapping <code>dpkg</code>/<code>dpkg-query</code>, POSIX service control, and real HTTP requests against the service's health endpoint.",
    "rlis.detail.casesNote":
      'Full detail of all 15 cases (TC-001 to TC-015) is documented in the <a href="https://github.com/yoelalmiron1997/robot-linux-integration-suite#casos-de-prueba" target="_blank" rel="noopener noreferrer">repository README</a>.',
    "rlis.detail.evidence":
      'Every CI run packages versions 1.0.0 and 1.1.0, executes the 15 cases with root permissions inside an Ubuntu/Debian container, and publishes <code>report.html</code>, <code>log.html</code> and <code>output.xml</code> as downloadable artifacts. See the <a href="https://github.com/yoelalmiron1997/robot-linux-integration-suite/actions/workflows/robot-tests.yml" target="_blank" rel="noopener noreferrer">run history</a>.',
    "rlis.detail.result":
      "A Docker-reproducible suite that validates not just the service's functional behavior, but also package integrity and its full lifecycle — the way a QA team would validate a release before shipping it.",
    "rlis.detail.learnings":
      "Testing at the operating-system level (installation, services, POSIX signals) requires designing Robot Framework keywords that abstract shell commands without losing precision about what's actually being validated at each step — traceability between a keyword and the real command is just as important as the final result.",

    /* ---------- Selenium Portfolio 3D ---------- */
    "sel.meta.title": "Selenium 4 QA & Scraping Portfolio — Yoel Almirón",
    "sel.meta.description":
      "E2E automation suite with Selenium 4 and Pytest (Page Object Model) over a 3D-printing price comparator, with a web scraping bot and CI/CD.",
    "sel.hero.lead":
      "E2E automation suite with Selenium 4 and Pytest over a 3D-printing price comparator (search, category filters, price sorting), plus a web scraping bot feeding the site's data. Deploy and test report automatically published via GitHub Actions.",
    "sel.hero.viewReport": "HTML test report",
    "sel.detail.context":
      "A price-comparison site needs more than just displaying data — it needs to guarantee that search, filtering and sorting work reliably as the catalog changes, exactly the kind of user flow that silently breaks when the frontend changes without E2E test coverage.",
    "sel.detail.objective":
      "Build an E2E automation suite with Selenium 4 and Pytest, organized with the Page Object Model pattern, validating the critical flows of a 3D-printing price comparator, fed by a custom web scraping bot, with automated deploy and evidence reporting on every push.",
    "sel.detail.risks":
      "Searches that don't filter results correctly, category filters returning products from another category, inconsistent price sorting (ascending/descending), and empty-result searches that don't clear the grid properly.",
    "sel.detail.strategy":
      "Pytest suite with a Page Object Model architecture (<code>HomePage</code> + <code>BasePage</code> using explicit <code>WebDriverWait</code>, with no unnecessary fixed <code>sleep</code> calls in the assertion layer). Cases cover initial home load, text search, category filtering, ascending/descending price sorting, and empty-result search. Runs headless in CI and also supports a visible mode for local debugging.",
    "sel.detail.evidence":
      'The site and test report are automatically deployed on every push. See the <a href="https://yoelalmiron1997.github.io/selenium-portfolio-3d/" target="_blank" rel="noopener noreferrer">live demo</a> and the <a href="https://yoelalmiron1997.github.io/selenium-portfolio-3d/reports/report.html" target="_blank" rel="noopener noreferrer">HTML report of the latest run</a>.',
    "sel.detail.result":
      "A reproducible E2E suite running in headless Chrome inside GitHub Actions, with execution evidence (HTML report + per-test screenshots) published automatically, with no manual steps between the push and the visible report.",
    "sel.detail.learnings":
      "Separating explicit <code>WebDriverWait</code> calls from the <code>time.sleep</code> calls used to wait for frontend animations makes it much clearer, when reading a failing test, whether the issue is a timing problem or a real behavior change.",
  },
};
