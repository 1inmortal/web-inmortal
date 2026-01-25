# Configuración de GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages usando GitHub Actions.

## 🚀 Cómo Funciona

1. **Push a main**: Cada vez que hagas push a la rama `main`, el workflow se ejecuta automáticamente
2. **Build automático**: GitHub Actions instala dependencias y construye el proyecto
3. **Deploy**: Los archivos compilados de `dist/` se despliegan en GitHub Pages

## 📋 Requisitos Previos

1. **Habilitar GitHub Pages** en la configuración del repositorio:
   - Ve a `Settings` > `Pages`
   - En `Source`, selecciona `GitHub Actions`

2. **Permisos del workflow**:
   - El workflow ya tiene los permisos necesarios configurados
   - No se requiere configuración adicional

## 🔧 Configuración del Workflow

El workflow está en `.github/workflows/jekyll-gh-pages.yml` y:
- Se ejecuta en cada push a `main`
- Construye el proyecto con `npm run build`
- Despliega solo los archivos de `portfolio-react/dist/`

## 📝 Notas Importantes

- **Código fuente en el repo**: El código fuente (`src/`) debe estar en el repositorio para que GitHub Actions pueda construir el proyecto
- **Solo dist/ se sirve**: GitHub Pages solo sirve los archivos compilados de `dist/`, no el código fuente
- **Base path**: Si tu repositorio no está en la raíz de GitHub Pages, actualiza `base` en `vite.config.js`

## 🔗 URL del Sitio

Una vez desplegado, tu sitio estará disponible en:
```
https://[tu-usuario].github.io/web-inmortal/
```

O si usas un dominio personalizado, en la URL que hayas configurado.

## 🛠️ Build Manual

Si necesitas construir manualmente:
```bash
cd portfolio-react
npm install
npm run build
```

Los archivos compilados estarán en `portfolio-react/dist/`.
