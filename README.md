# Fit Tracker

## Integrantes

- Facundo Martín Morán
- Santiago Benjamin Avila Puntano
- Leandro Joel López
- Fabricio Sergio Lazarte

## Descripción breve

Fit Tracker es una aplicación web para consultar ejercicios, elegir rutinas de ejemplo y organizar el entrenamiento. Esta versión utiliza React y Vite, con páginas independientes y navegación mediante React Router. Mantiene la identidad visual negra y naranja y utiliza React Bootstrap para el diseño responsive.

La aplicación contiene Inicio, Rutinas, Ejercicios, Calendario y Progreso. El catálogo incluye 48 ejercicios de ocho grupos musculares, con ilustraciones de la mascota, búsqueda por nombre, músculo o equipo y selección. Inicialmente se muestran ocho ejercicios y se puede desplegar el resto. La biblioteca ofrece tres rutinas de ejemplo y permite crear rutinas propias con nombre, descripción y ejercicios con series y repeticiones o segundos. Se pueden editar y eliminar con confirmación; las rutinas agendadas no se eliminan para conservar las referencias del calendario. Al crear una rutina se pueden aprovechar los ejercicios seleccionados en el catálogo. Las selecciones de ejercicios y de la biblioteca se comparten entre páginas y se muestran en Progreso durante la visita; se reinician al recargar, pero las rutinas creadas permanecen. El calendario empieza en el mes actual, permite cambiar de mes y respeta la distribución de lunes a domingo. Desde hoy en adelante se puede agendar una rutina, modificarla o quitarla. Las fechas pasadas quedan como historial de solo lectura. Los días con entrenamiento quedan marcados y la agenda del mes se muestra debajo.

La agenda y las rutinas propias utilizan useState para manejar sus datos y useEffect para guardarlos en localStorage cuando cambian. Se recuperan al abrir la aplicación y permanecen al navegar o recargar en el mismo navegador y origen; no se comparten entre dispositivos ni puertos diferentes. Si los datos locales están dañados, no se sobrescriben automáticamente; los errores de guardado se informan en pantalla. Agendar una rutina no registra un entrenamiento realizado. Esta versión todavía no incorpora registro de sesiones, métricas reales de entrenamiento, login ni backend. Las plantillas son ejemplos generales y no reemplazan una planificación profesional.

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
                       RutinaItem, FormularioRutina e ImagenIlustrativa
  data/contenido.js    Listas de navegación, ejercicios y rutinas
  hooks/useAgenda.js   Estado de agenda y sincronización con localStorage
  hooks/useRutinas.js  Estado de rutinas propias y persistencia local
  utils/agenda.js      Fechas, validación y almacenamiento de la agenda
  utils/rutinas.js     Validación y almacenamiento de rutinas propias
  pages/               Inicio, Rutinas, Ejercicios, Calendario,
                       Progreso y NoEncontrada
  App.jsx              Rutas y estado compartido
  main.jsx             Inicio de React y BrowserRouter
  index.css            Identidad visual y ajustes del calendario

Las páginas representan las vistas completas. Los componentes reciben datos y acciones mediante props. La navegación, las tarjetas, las rutinas, las semanas del calendario y el resumen usan `map()` con claves estables.

La justificación de los hooks del calendario y sus dependencias está en `docs/TP7-Hooks.md`, y la de rutinas en `docs/TP7-Rutinas.md`. Las pruebas se ejecutan con `node --test tests/agenda.test.mjs tests/rutinas.test.mjs`, además de la revisión con lint y build.