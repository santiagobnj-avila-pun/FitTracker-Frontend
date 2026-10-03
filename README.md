# Fit Tracker

## Integrantes

- Facundo Martín Morán
- Santiago Benjamin Avila Puntano
- Leandro Joel López
- Fabricio Sergio Lazarte

## Descripción breve

Fit Tracker es una aplicación web para consultar ejercicios, elegir rutinas de ejemplo y organizar el entrenamiento. Esta versión utiliza React y Vite, con páginas independientes y navegación mediante React Router. Mantiene la identidad visual negra y naranja y utiliza React Bootstrap para el diseño responsive.

La aplicación contiene Inicio, Rutinas, Ejercicios, Calendario y Progreso. El catálogo incluye 48 ejercicios de ocho grupos musculares, con ilustraciones de la mascota, búsqueda por nombre, músculo o equipo y selección. Inicialmente se muestran ocho ejercicios y se puede desplegar el resto. La biblioteca ofrece tres rutinas de ejemplo y permite elegir una. Las selecciones se comparten entre páginas y se muestran en Progreso durante la visita; se reinician al recargar. El calendario empieza en el mes actual, permite cambiar de mes y respeta la distribución de lunes a domingo.

Esta carpeta no incorpora todavía registro de sesiones, métricas reales de entrenamiento, edición de rutinas, login, backend ni persistencia. Las plantillas son ejemplos generales y no reemplazan una planificación profesional.

Las imágenes originales están en `public/img/`: mascota principal, mascota reclinada del menú, logo e ilustraciones de los 48 ejercicios, incluidas las de abdomen y las gorras corregidas. El componente ImagenIlustrativa utiliza una imagen de respaldo si algún archivo no puede cargarse.

## Tecnologías utilizadas

- React 19 y Vite 8.
- React Bootstrap y Bootstrap 5.3.
- React Router para rutas, enlaces y navegación sin recargar la aplicación.
- JavaScript, hooks `useState` y `useEffect`, props y `map()`.
- HTML semántico y CSS para la identidad visual.
- Git y GitHub para el control de versiones.

## Instalación y ejecución

Se requiere Node.js 22.12 o superior y npm.

Desde la carpeta del proyecto:

npm install
npm run dev

Abrir la dirección que muestre Vite en la terminal.

npm run lint
npm run build
npm run preview

`lint` verifica el código, `build` genera la versión de producción en `dist/` y `preview` permite revisarla localmente después del build.

## Organización del código

public/
  img/                 Ilustraciones y respaldo visual
src/
  components/          Navbar, Footer, PageLayout, EjercicioCard,
                       RutinaItem e ImagenIlustrativa
  data/contenido.js    Listas de navegación, ejercicios y rutinas
  pages/               Inicio, Rutinas, Ejercicios, Calendario,
                       Progreso y NoEncontrada
  App.jsx              Rutas y estado compartido
  main.jsx             Inicio de React y BrowserRouter
  index.css            Identidad visual y ajustes del calendario

Las páginas representan las vistas completas. Los componentes reciben datos y acciones mediante props. La navegación, las tarjetas, las rutinas, las semanas del calendario y el resumen usan `map()` con claves estables.