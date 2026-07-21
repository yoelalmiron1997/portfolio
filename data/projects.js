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
    technologies: ["Python", "Robot Framework", "REST API", "FHIR","Swagger", "GitHub Pages"],
    status: "done",
    statusLabel: "Finalizado",
    pageUrl: "projects/healthcare-fhir/index.html",
    repositoryUrl: "https://github.com/yoelalmiron1997/healthcare-fhir-integration",
    deployUrl: "https://healthcare-fhir-api.onrender.com/docs",
    featured: true,
  },
  {
    title: "Arsat Telemetry Simulator",
    slug: "arsat-telemetry-simulator",
    description:
      "Proyecto de automatización sobre una API REST, enfocado en análisis de riesgos, diseño de casos de prueba, validación de respuestas y generación de reportes.",
    technologies: ["Robot Framework", "Python","MQTT","CI/CD", "Grafana", "GitHub Actions"],
    status: "progress",
    statusLabel: "Finalizado",
    pageUrl: "projects/arsat-telemetry-simulator/index.html",
    repositoryUrl: "https://github.com/yoelalmiron1997/arsat-telemetry-simulator",
    deployUrl: "",
    featured: false,
  },
  {
    title: "Robot Framework Test Automation",
    slug: "robot-framework",
    description:
      "Resumen del curso realizado, habilidades reforzadas, certificado y aplicación práctica mediante una demostración sencilla.",
    technologies: ["Robot Framework", "Python", "SeleniumLibrary"],
    status: "info",
    statusLabel: "Curso finalizado",
    pageUrl: "projects/robot-framework/index.html",
    repositoryUrl: "https://github.com/yoelalmiron1997/robot-framework-level-2-demo",
    deployUrl: "",
    featured: false,
  },
  {
    title: "Comparador de configuraciones JSON",
    slug: "json-config-comparator",
    description:
      "Herramienta en Python para comparar archivos de configuración JSON y generar un reporte HTML visual con sus diferencias.",
    technologies: ["Python", "JSON", "HTML", "CSS"],
    status: "done",
    statusLabel: "Finalizado",
    pageUrl: "projects/json-config-comparator/index.html",
    repositoryUrl: "https://github.com/yoelalmiron1997/json-config-comparator",
    deployUrl: "https://yoelalmiron1997.github.io/json-config-comparator/",
    featured: false,
  },
];

// Exponer en window para script.js (sin módulos, compatible con GitHub Pages)
window.PROJECTS = PROJECTS;
