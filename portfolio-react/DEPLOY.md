# Guía de Despliegue

Este proyecto está configurado para subir **solo los archivos compilados** (directorio `dist/`) sin exponer el código fuente.

## Proceso de Despliegue

### 1. Compilar el proyecto
```bash
npm run build
```

Esto generará los archivos optimizados en el directorio `dist/`.

### 2. Verificar el contenido de dist/
El directorio `dist/` contiene:
- `index.html` - Página principal
- `assets/` - Archivos JavaScript y CSS compilados y minificados
- `vite.svg` - Icono del sitio

### 3. Subir a repositorio
Solo se subirán los archivos del directorio `dist/`. El código fuente (carpeta `src/`, `package.json`, etc.) está excluido por `.gitignore`.

### 4. Servir los archivos
Los archivos en `dist/` pueden ser servidos por cualquier servidor web estático:
- GitHub Pages
- Netlify
- Vercel
- Servidor Apache/Nginx
- Cualquier hosting estático

## Estructura del Repositorio

```
portfolio-react/
├── dist/              ← Solo esto se sube al repositorio
│   ├── index.html
│   ├── assets/
│   └── vite.svg
└── [código fuente excluido]
```

## Notas Importantes

- **No se expone código fuente**: Los archivos `.jsx`, `.js`, y la carpeta `src/` están excluidos
- **Solo archivos compilados**: El directorio `dist/` contiene código minificado y optimizado
- **Recompilar antes de subir**: Siempre ejecuta `npm run build` antes de hacer commit si has hecho cambios
