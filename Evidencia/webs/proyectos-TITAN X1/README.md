# THE VAULT | TITAN X1 — Proyecto React

Proyecto React generado desde **gsap/proyectos.html** (fuera de la carpeta gsap).

## Fuente de verdad / Comparación

- **HTML de referencia:** `../gsap/proyectos.html` (index completo).
- Para **sincronizar** el proyecto React con ese HTML cada vez que lo edites:
  1. Guarda los cambios en `gsap/proyectos.html`.
  2. En la raíz del escritorio (HTM A JSX) ejecuta:
     - `node convert-proyectos-to-react.js`
     - o `build-proyectos-react.bat`

Así el proyecto React se compara y actualiza con el `proyectos.html` completo.

## Comandos

```bash
npm install
npm run dev    # desarrollo
npm run build  # producción
npm run preview # vista previa del build
```

## Estructura

- `src/App.jsx` — Renderiza el cuerpo del HTML y carga el script 3D/GSAP.
- `src/styles.css` — Estilos + Tailwind v4 (vía PostCSS, sin CDN en producción).
- `public/vault-app.js` — Lógica Three.js + GSAP + TextPlugin (preloader "SYSTEM READY").
- `public/asus_rog_strix_scar_17_2023_g733_gaming_laptop.glb` — Modelo 3D.
- `postcss.config.js` — Tailwind v4 con `@tailwindcss/postcss`.
