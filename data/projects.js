/**
 * data/projects.js
 *
 * Fuente de datos de los proyectos que se muestran en la landing.
 *
 * Para agregar un proyecto nuevo:
 *   1. Copiar la carpeta projects/template a projects/<slug>
 *   2. Editar el contenido de projects/<slug>/index.html
 *   3. Agregar aquí un objeto nuevo con el mismo <slug>
 *
 * "status" acepta: "done" | "progress" | "info"
 *   done     -> se muestra como PASS / Finalizado (verde)
 *   progress -> se muestra como En desarrollo (ámbar)
 *   info     -> se muestra como estado informativo (azul), p. ej. cursos
 */

const PROJECTS = [
  {
    title: "Healthcare FHIR Integration Testing",
    slug: "healthcare-fhir",
    description:
      "Proyecto orientado a la validación de integraciones de sistemas de salud mediante recursos FHIR, pruebas de API y documentación de evidencia.",
    descriptionEn:
      "Project focused on validating healthcare system integrations via FHIR resources, API testing and evidence documentation.",
    technologies: ["Python", "Robot Framework", "REST API", "FHIR","Swagger", "GitHub Pages"],
    status: "done",
    statusLabel: "Finalizado",
    statusLabelEn: "Completed",
    pageUrl: "projects/healthcare-fhir/index.html",
    repositoryUrl: "https://github.com/yoelalmiron1997/healthcare-fhir-integration",
    deployUrl: "https://healthcare-fhir-api.onrender.com/docs",
    featured: false,
  },
  {
    title: "Arsat Telemetry Simulator",
    slug: "arsat-telemetry-simulator",
    description:
      "Simulador de telemetría satelital (Python + MQTT + Prometheus + Grafana) con suite de testing automatizado en 4 niveles (Pytest + Robot Framework) y pipeline de CI/CD en GitHub Actions.",
    descriptionEn:
      "Satellite telemetry simulator (Python + MQTT + Prometheus + Grafana) with a 4-level automated testing suite (Pytest + Robot Framework) and a CI/CD pipeline on GitHub Actions.",
    technologies: ["Python", "Pytest", "Robot Framework", "MQTT", "Docker", "Prometheus", "Grafana", "CI/CD"],
    status: "done",
    statusLabel: "Finalizado",
    statusLabelEn: "Completed",
    pageUrl: "projects/arsat-telemetry-simulator/index.html",
    repositoryUrl: "https://github.com/yoelalmiron1997/arsat-telemetry-simulator",
    deployUrl: "https://snapshots.raintank.io/dashboard/snapshot/PQ49MNRfXkyY8Il9dfPuyUodAw8nV3GQ?orgId=0&from=2026-07-22T14:42:19.854Z&to=2026-07-22T15:12:19.854Z&timezone=browser&refresh=5s",
    featured: true,
  },
  {
    title: "Robot Framework Linux Integration Testing",
    slug: "robot-linux-integration-suite",
    description:
      "Suite de pruebas de integración con Robot Framework para validar el ciclo de vida completo de un servicio Linux empaquetado como .deb: instalación, arranque, actualización, logs, recuperación ante SIGKILL y remoción limpia.",
    descriptionEn:
      "Robot Framework integration test suite validating the full lifecycle of a Linux service packaged as a .deb: install, startup, upgrade, logs, SIGKILL recovery and clean removal.",
    technologies: ["Robot Framework", "Python", "Linux", "Debian (.deb)", "Docker", "CI/CD"],
    status: "done",
    statusLabel: "Finalizado",
    statusLabelEn: "Completed",
    pageUrl: "projects/robot-linux-integration-suite/index.html",
    repositoryUrl: "https://github.com/yoelalmiron1997/robot-linux-integration-suite",
    deployUrl: "https://github.com/yoelalmiron1997/robot-linux-integration-suite/actions/workflows/robot-tests.yml",
    deployLabel: "Ver CI",
    deployLabelEn: "View CI",
    featured: false,
  },
  {
    title: "AI QA Testing Agent Platform",
    slug: "ai-qa-testing-agent",
    description:
      "Agente de IA autónomo que analiza especificaciones OpenAPI/Swagger, evalúa riesgo por endpoint, genera casos de prueba en 9 dimensiones, ejecuta aserciones HTTP reales y diagnostica defectos con causa raíz.",
    descriptionEn:
      "Autonomous AI agent that analyzes OpenAPI/Swagger specs, scores risk per endpoint, generates test cases across 9 dimensions, executes real HTTP assertions and diagnoses defects with root-cause analysis.",
    technologies: ["Python", "FastAPI", "OpenAPI/Swagger", "SQLAlchemy", "Docker", "CI/CD"],
    status: "done",
    statusLabel: "Finalizado",
    statusLabelEn: "Completed",
    pageUrl: "projects/ai-qa-testing-agent/index.html",
    repositoryUrl: "https://github.com/yoelalmiron1997/ai-qa-testing-agent",
    deployUrl: "https://ai-qa-testing-agent.onrender.com",
    featured: false,
  },
  {
    title: "Selenium 4 QA & Scraping Portfolio",
    slug: "selenium-portfolio-3d",
    description:
      "Suite de automatización E2E con Selenium 4 y Pytest (patrón Page Object Model) sobre un comparador de precios de impresión 3D, más un bot de web scraping. Deploy y reporte de pruebas publicados vía GitHub Actions.",
    descriptionEn:
      "E2E automation suite with Selenium 4 and Pytest (Page Object Model) over a 3D-printing price comparator, plus a web scraping bot. Deploy and test report published via GitHub Actions.",
    technologies: ["Python", "Selenium 4", "Pytest", "Page Object Model", "Web Scraping", "CI/CD"],
    status: "done",
    statusLabel: "Finalizado",
    statusLabelEn: "Completed",
    pageUrl: "projects/selenium-portfolio-3d/index.html",
    repositoryUrl: "https://github.com/yoelalmiron1997/selenium-portfolio-3d",
    deployUrl: "https://yoelalmiron1997.github.io/selenium-portfolio-3d/",
    deployLabel: "Ver demo",
    deployLabelEn: "View demo",
    featured: false,
  },
];

// Exponer en window para script.js (sin módulos, compatible con GitHub Pages)
window.PROJECTS = PROJECTS;
