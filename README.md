# Portfolio QA — Yoel Almirón

Landing page personal + páginas internas de proyecto, construida con HTML, CSS y JavaScript
puro (sin frameworks). Pensada para GitHub Pages, con estética de terminal / reporte de
ejecución de pruebas.

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

1. Crear un repositorio (por ejemplo `portfolio-qa`) y subir todo el contenido de esta
   carpeta a la rama `main`.
2. En GitHub → **Settings → Pages**, elegir como fuente la rama `main` y la carpeta `/ (root)`.
3. GitHub Pages publicará el sitio en:
   `https://<tu-usuario>.github.io/<nombre-del-repositorio>/`
4. Todas las rutas del proyecto son relativas (`styles.css`, `data/projects.js`,
   `projects/<slug>/index.html`, etc.), por lo que funcionan tanto en la raíz de un dominio
   propio como en un subpath de GitHub Pages, sin necesidad de ajustar nada.

## Reemplazar URLs de ejemplo

Antes de publicar, reemplazar los enlaces temporales por los reales:

| Dónde | Qué reemplazar |
|---|---|
| `index.html` (hero y contacto) | `https://github.com/yoelalmiron`, `https://www.linkedin.com/in/yoelalmiron`, `mailto:yoel.almiron.qa@gmail.com` |
| `data/projects.js` | `repositoryUrl` y `deployUrl` de cada proyecto |
| `projects/<slug>/index.html` | Los mismos enlaces de repositorio y deploy dentro del hero de cada página interna |
| `index.html` y `projects/robot-framework-level-2/index.html` | ruta al certificado real en `assets/certificates/` |

Un `deployUrl` vacío (`""`) hace que la landing muestre automáticamente el enlace como
**"Deploy (pendiente)"** en lugar de un enlace roto — no hace falta borrar el campo, alcanza
con dejarlo vacío hasta tener el deploy real.

## Agregar un proyecto nuevo

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

## Notas

- El panel de ejecución de pruebas en el hero es **contenido ilustrativo**, aclarado
  explícitamente en la propia página — no representa métricas reales de un proyecto en
  producción.
- Ninguna sección de las páginas internas incluye resultados o evidencia inventada: donde
  todavía no hay contenido real, se muestra un texto honesto indicándolo.
