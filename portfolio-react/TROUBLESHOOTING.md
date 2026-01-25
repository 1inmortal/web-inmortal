# Solución de Problemas - GitHub Pages

## Error 404: File not found

### Posibles causas y soluciones:

### 1. Base Path Incorrecto

**Síntoma**: El sitio carga pero los recursos (CSS, JS) dan 404

**Solución**: 
- Verifica que `vite.config.js` detecte correctamente el tipo de repositorio
- Si es un repositorio de proyecto (ej: `usuario/web-inmortal`), el base path debe ser `/web-inmortal/`
- Si es un sitio de usuario (ej: `usuario/usuario.github.io`), el base path debe ser `/`

### 2. Archivo .nojekyll Faltante

**Síntoma**: GitHub Pages no sirve archivos estáticos correctamente

**Solución**: 
- El archivo `.nojekyll` se crea automáticamente después de cada build
- Verifica que exista en `dist/.nojekyll`
- Si falta, ejecuta: `npm run build` (el script postbuild lo crea)

### 3. GitHub Pages No Configurado

**Síntoma**: El sitio no se despliega

**Solución**:
1. Ve a `Settings` > `Pages` en tu repositorio
2. En `Source`, selecciona `GitHub Actions`
3. Guarda los cambios

### 4. Workflow No Se Ejecuta

**Síntoma**: No hay despliegues automáticos

**Solución**:
- Verifica que el workflow esté en `.github/workflows/jekyll-gh-pages.yml`
- Verifica que estés haciendo push a la rama `main`
- Revisa la pestaña `Actions` en GitHub para ver errores

### 5. Rutas Absolutas vs Relativas

**Síntoma**: Recursos no cargan en GitHub Pages pero sí localmente

**Solución**:
- El `vite.config.js` detecta automáticamente el base path
- En desarrollo local usa `/`
- En GitHub Pages usa el base path correcto según el tipo de repositorio

## Verificación Rápida

1. **Build local funciona?**
   ```bash
   cd portfolio-react
   npm run build
   npm run preview
   ```

2. **Archivo .nojekyll existe?**
   ```bash
   ls dist/.nojekyll
   ```

3. **Workflow se ejecutó?**
   - Ve a la pestaña `Actions` en GitHub
   - Verifica que el último workflow haya completado exitosamente

4. **GitHub Pages está habilitado?**
   - Ve a `Settings` > `Pages`
   - Verifica que `Source` esté en `GitHub Actions`

## URLs Esperadas

- **Repositorio de proyecto**: `https://[usuario].github.io/[repositorio]/`
- **Sitio de usuario**: `https://[usuario].github.io/`

## Contacto

Si el problema persiste, verifica:
- Los logs del workflow en GitHub Actions
- La configuración de GitHub Pages
- Que el base path en `vite.config.js` sea correcto para tu tipo de repositorio
