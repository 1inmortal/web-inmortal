# Guía: Agregar Enlaces Externos al Menú de Navegación

## 📍 Ubicación

El menú de navegación se encuentra en:
```
portfolio-react/src/components/Header/Header.jsx
```

## 🔗 Cómo Agregar un Enlace Externo

### Paso 1: Editar el array `navLinks`

En el archivo `Header.jsx`, encuentra el array `navLinks` (alrededor de la línea 13-19):

```javascript
const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Acerca', href: '#acerca' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Contacto', href: '#contacto' },
];
```

### Paso 2: Agregar tu enlace externo

Simplemente agrega un nuevo objeto al array con la URL completa:

```javascript
const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Acerca', href: '#acerca' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Contacto', href: '#contacto' },
  // Agregar enlace externo aquí:
  { name: 'Blog', href: 'https://mi-blog-react.vercel.app' },
  { name: 'Tienda', href: 'https://mi-tienda.netlify.app' },
];
```

## ✨ Características Automáticas

El componente detecta automáticamente si un enlace es externo:

- **Enlaces internos** (que empiezan con `#`): Hacen scroll suave dentro de la página
- **Enlaces externos** (que empiezan con `http://` o `https://`): 
  - Se abren en una nueva pestaña
  - Muestran un ícono de enlace externo (🔗)
  - Incluyen `target="_blank"` y `rel="noopener noreferrer"` por seguridad

## 📝 Ejemplos

### Ejemplo 1: Enlace a otra aplicación React en Vercel
```javascript
{ name: 'Mi Blog', href: 'https://mi-blog.vercel.app' }
```

### Ejemplo 2: Enlace a otra aplicación React en Netlify
```javascript
{ name: 'Tienda Online', href: 'https://mi-tienda.netlify.app' }
```

### Ejemplo 3: Enlace a otra aplicación React en GitHub Pages
```javascript
{ name: 'Proyectos', href: 'https://usuario.github.io/otro-proyecto' }
```

### Ejemplo 4: Enlace a cualquier URL
```javascript
{ name: 'Documentación', href: 'https://docs.mi-sitio.com' }
```

## 🎨 Personalización

Si quieres cambiar el estilo o comportamiento de los enlaces externos, edita:

1. **Desktop Nav** (línea ~58-80): Estilos para el menú de escritorio
2. **Mobile Menu** (línea ~104-130): Estilos para el menú móvil

## ⚠️ Notas Importantes

- Los enlaces externos se abren en una nueva pestaña automáticamente
- El ícono de enlace externo se muestra automáticamente
- No necesitas agregar `external: true` - se detecta automáticamente por la URL
- Asegúrate de usar URLs completas con `https://` o `http://`

## 🔄 Orden de los Enlaces

Puedes reorganizar el orden de los enlaces simplemente cambiando su posición en el array:

```javascript
const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Blog', href: 'https://mi-blog.com' }, // Enlace externo primero
  { name: 'Acerca', href: '#acerca' },
  // ...
];
```
