# Portfolio Tester — Yoel Almirón (Ingeniero en Sistemas)

Buenas! este proyecto es una Landing page personal + páginas internas de proyecto, construida con HTML, CSS y JavaScript
puro (sin frameworks). Pensada para GitHub Pages, con estadistica y información de mi Portfolio.

## Estructura del proyecto

```
portfolio-qa/
├── index.html                  Landing principal
├── styles.css                  Sistema de diseño (tokens + componentes)
├── script.js                   Render de proyectos, nav mobile, reveal on scroll
├── README.md
├── data/
│   └── projects.js             Fuente de datos de los proyectos
├── assets/
│   ├── images/                 Imágenes de proyectos (opcional)
│   ├── certificates/           Certificados (PDF, imágenes)
│   ├── icons/                  Íconos propios (opcional)
│   └── favicon.svg
└── projects/
    ├── healthcare-fhir/
    ├── robot-framework-level-2/
    ├── qa-api-portfolio/
    ├── json-config-comparator/
    └── template/                Punto de partida para un proyecto nuevo
```

## Cómo verlo en local

No requiere build ni instalación de dependencias. Alcanza con un servidor estático simple,
por ejemplo:

```bash
cd portfolio-qa
python3 -m http.server 8000
```

Luego abrir `http://localhost:8000` en el navegador.

> Abrir `index.html` directamente con doble clic también funciona, aunque algunos
> navegadores restringen `fetch`/módulos bajo `file://`. Este proyecto no usa `fetch` ni
> módulos ES, así que funciona igual, pero el servidor local es la forma recomendada.

## Deploy en GitHub Pages

El sitio ya está publicado en:

`https://yoelalmiron1997.github.io/portfolio/`

Repositorio: `https://github.com/yoelalmiron1997/portfolio`

## Para agregar un proyecto nuevo 

PASOS:

1. Copiar la carpeta `projects/template` a `projects/<nuevo-slug>`.
2. Editar `projects/<nuevo-slug>/index.html`: título, estado, descripción, contexto,
   objetivo, riesgos, estrategia de pruebas, tecnologías, evidencia, resultados y
   aprendizajes. Las secciones que todavía no tengan contenido real deben dejarse con los
   textos honestos ya presentes en la plantilla (por ejemplo *"Proyecto en desarrollo"* o
   *"Evidencia pendiente de publicación"") — no inventar resultados.
3. Agregar un objeto nuevo en `data/projects.js`:

   ```js
   {
     title: "Nombre del proyecto",
     slug: "nuevo-slug",
     description: "Descripción breve.",
     technologies: ["Python", "Robot Framework"],
     status: "progress",      // "done" | "progress" | "info"
     statusLabel: "En desarrollo",
     pageUrl: "projects/nuevo-slug/index.html",
     repositoryUrl: "",
     deployUrl: "",
     featured: false,
   }
   ```

4. Guardar. La tarjeta aparece automáticamente en la landing, generada por `script.js` a
   partir de `data/projects.js` — no hace falta tocar `index.html`.

Solo puede haber un proyecto `featured: true` a la vez (se muestra con mayor jerarquía
visual, primero en la lista).

## Sistema de diseño

Los tokens de color, tipografía y espaciado están centralizados como variables CSS al
inicio de `styles.css` (`:root`). Cambiar un valor ahí lo actualiza en todo el sitio,
incluidas las páginas internas de proyecto.

- **Tipografía**: Space Grotesk (títulos), Newsreader (cuerpo), JetBrains Mono (etiquetas,
  estados, comandos y tecnologías). Se cargan desde Google Fonts en el `<head>` de cada
  página.
- **Accesibilidad**: HTML semántico, foco de teclado visible, `prefers-reduced-motion`
  respetado, textos alternativos en elementos decorativos marcados como tales.
- **Responsive**: mobile-first con breakpoints en 1080px y 720px. El menú de navegación
  colapsa en un desplegable por debajo de 720px.

