# Portfolio React - INMORTAL_OS

Portafolio profesional desarrollado con React y Vite. SPA (Single Page Application) con navegación anclada, diseño moderno y responsivo.

## 🚀 Características

- **SPA con navegación anclada**: Navegación suave entre secciones
- **Componentes modulares**: Código organizado por componentes reutilizables
- **Datos en JSON**: Proyectos, servicios y timeline en archivos JSON
- **Animaciones suaves**: Scroll reveal y transiciones
- **Diseño moderno**: Paleta oscura con acentos cyan
- **Responsive**: Diseño adaptativo para móviles, tablets y desktop
- **Optimizado**: Build de producción optimizado con Vite

## 📁 Estructura del Proyecto

```
portfolio-react/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header/         # Navegación principal
│   │   ├── Hero/           # Sección principal
│   │   ├── About/          # Sobre mí y timeline
│   │   ├── Services/       # Servicios ofrecidos
│   │   ├── Projects/       # Portafolio de proyectos
│   │   ├── Contact/        # Formulario de contacto
│   │   └── Footer/         # Pie de página
│   ├── data/               # Archivos JSON con datos
│   │   ├── projects.json   # Proyectos del portafolio
│   │   ├── services.json   # Servicios ofrecidos
│   │   └── timeline.json   # Línea de tiempo profesional
│   ├── styles/             # Estilos globales
│   │   └── index.css       # CSS con Tailwind y animaciones
│   ├── App.jsx             # Componente principal
│   └── main.jsx            # Punto de entrada
├── package.json
├── tailwind.config.js      # Configuración de Tailwind
└── postcss.config.js       # Configuración de PostCSS
```

## 🛠️ Tecnologías

- **React 19**: Biblioteca de UI
- **Vite**: Build tool y dev server
- **Tailwind CSS**: Framework de estilos
- **Lucide React**: Iconos
- **PostCSS**: Procesador de CSS

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 📝 Componentes

### Header
Navegación principal con menú responsive. Enlaces de anclaje a las secciones.

### Hero
Sección principal con título, subtítulo y botones CTA (Ver Portafolio, Descargar CV).

### About
Descripción profesional y línea de tiempo con experiencia laboral.

### Services
Grid de servicios con íconos, descripciones y tecnologías.

### Projects
Grid de proyectos con imágenes, descripciones, tecnologías y estados.

### Contact
Formulario de contacto con campos: Nombre, Correo, Asunto, Mensaje.

### Footer
Pie de página con enlaces legales y redes sociales.

## 🎨 Personalización

### Datos
Edita los archivos JSON en `src/data/`:
- `projects.json`: Agrega o modifica proyectos
- `services.json`: Personaliza servicios
- `timeline.json`: Actualiza experiencia laboral

### Estilos
Los estilos globales están en `src/styles/index.css`. Incluye:
- Variables CSS personalizadas
- Animaciones (fadeInUp, fadeInLeft, fadeIn)
- Utilidades para scroll reveal

### Colores
La paleta de colores está definida en las variables CSS:
- `--bg-main`: Fondo principal (#020617)
- `--primary`: Color primario cyan (#06b6d4)
- `--text-main`: Color de texto principal (#e2e8f0)

## 🚀 Deploy

El proyecto está listo para deploy en:
- **Vercel**: `vercel --prod`
- **Netlify**: Arrastra la carpeta `dist` después del build
- **GitHub Pages**: Configura el workflow de GitHub Actions

## 📄 Licencia

MIT

## 👤 Autor

INMORTAL_OS - Ingeniero Full-Stack
