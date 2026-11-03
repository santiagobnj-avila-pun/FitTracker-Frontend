# Fit Tracker

## Integrantes

- Facundo Martín Morán
- Santiago Benjamin Avila Puntano
- Leandro Joel López
- Fabricio Sergio Lazarte

## Descripción breve

Fit Tracker es una aplicación web para consultar ejercicios, elegir rutinas de ejemplo y organizar el entrenamiento. Esta versión utiliza React y Vite, con páginas independientes y navegación mediante React Router. Mantiene la identidad visual negra y naranja y utiliza React Bootstrap para el diseño responsive.

La aplicación contiene Inicio, Rutinas, Ejercicios, Calendario y Progreso. El catálogo incluye 48 ejercicios de ocho grupos musculares, con ilustraciones de la mascota, búsqueda por nombre, músculo o equipo y selección. Inicialmente se muestran ocho ejercicios y se puede desplegar el resto. La biblioteca ofrece tres rutinas de ejemplo y permite crear rutinas propias con nombre, descripción y ejercicios con series y repeticiones o segundos. Se pueden editar y eliminar con confirmación; las rutinas agendadas no se eliminan para conservar las referencias del calendario. Al crear una rutina se pueden aprovechar los ejercicios seleccionados en el catálogo. Las selecciones de ejercicios y de la biblioteca se comparten entre páginas y se muestran en Progreso durante la visita; se reinician al recargar, pero las rutinas creadas permanecen. El calendario empieza en el mes actual, permite cambiar de mes y respeta la distribución de lunes a domingo. Desde hoy en adelante se puede agendar una rutina, modificarla o quitarla. Las fechas pasadas quedan como historial de solo lectura. Los días con entrenamiento quedan marcados y la agenda del mes se muestra debajo.

La agenda y las rutinas propias utilizan useState para manejar sus datos y useEffect para guardarlos en localStorage cuando cambian. Se recuperan al abrir la aplicación y permanecen al navegar o recargar en el mismo navegador y origen; no se comparten entre dispositivos ni puertos diferentes. Si los datos locales están dañados, no se sobrescriben automáticamente; los errores de guardado se informan en pantalla. Agendar una rutina no registra un entrenamiento realizado. Esta versión todavía no incorpora registro de sesiones ni métricas reales de entrenamiento. Las plantillas son ejemplos generales y no reemplazan una planificación profesional.

Las imágenes originales están en `public/img/`: mascota principal, mascota reclinada del menú, logo e ilustraciones de los 48 ejercicios, incluidas las de abdomen y las gorras corregidas. El componente ImagenIlustrativa utiliza una imagen de respaldo si algún archivo no puede cargarse.

El TP8 agrega la pestaña “Explorar más ejercicios” en Ejercicios. Consulta la API pública gratuita de ExerciseDB con Axios y permite buscar por nombre en inglés, filtrar por grupo corporal, avanzar o retroceder entre páginas de ocho resultados y consultar instrucciones. Las tarjetas muestran un fotograma quieto del ejercicio; la animación se ve al pulsar Ver demostración. El GIF se descarga con carga diferida para obtener esa vista previa. useState administra resultados, consulta, paginación, carga y errores; useEffect realiza la petición y la cancela al cambiar de consulta o salir de la sección. Si falla, se informa en pantalla y con SweetAlert2, con opción de reintentar. El catálogo local y las rutinas siguen funcionando independientemente de la API. Los resultados externos son de consulta y no se incorporan automáticamente a las rutinas propias.

Datos y GIFs externos: [ExerciseDB / AscendAPI](https://exercisedb.dev/), versión gratuita para uso educativo no comercial, con límites de peticiones y atribución requerida. Los textos originales están en inglés. [Documentación de la API](https://oss.exercisedb.dev/docs).

### Inicio de sesión

Las páginas `/login` y `/registro` permiten ingresar o crear una cuenta contra el backend de Fit Tracker (NestJS). Inicio y Ejercicios son públicas; Rutinas, Calendario y Progreso requieren sesión: si no hay una activa se redirige a `/login` y, al ingresar, se vuelve a la sección pedida. El menú muestra el nombre del usuario y la opción para cerrar sesión.

`AuthProvider` (Context API) comparte el usuario y las acciones `ingresar`, `registrarse` y `cerrarSesion`; los componentes lo consumen con el hook `useAuth`. El token JWT y los datos del usuario se guardan en localStorage. `services/api.js` es una instancia de Axios con la URL del backend que agrega el encabezado `Authorization: Bearer <token>` a cada petición; si el backend responde 401 a una petición autenticada, la sesión se cierra. Al abrir la aplicación se consulta el perfil para confirmar que el token sigue vigente.

Contrato esperado del backend:

| Método | Ruta | Cuerpo | Respuesta |
| --- | --- | --- | --- |
| POST | `/auth/register` | `{ nombre, email, password }` | `{ accessToken, usuario: { id, nombre, email } }` (409 si el email existe) |
| POST | `/auth/login` | `{ email, password }` | `{ accessToken, usuario: { id, nombre, email } }` (401 si las credenciales son incorrectas) |
| GET | `/auth/perfil` | — (requiere token) | `{ id, nombre, email }` |

El backend debe habilitar CORS para el origen del frontend. Por ahora las rutinas y la agenda siguen guardándose en localStorage; se migrarán al backend en la próxima etapa.

## Tecnologías utilizadas

- React 19 y Vite 8.
- React Bootstrap y Bootstrap 5.3.
- React Router para rutas, enlaces y navegación sin recargar la aplicación.
- JavaScript, hooks `useState` y `useEffect`, props y `map()`.
- Axios para peticiones HTTP y SweetAlert2 para avisos de error.
- HTML semántico y CSS para la identidad visual.
- Git y GitHub para el control de versiones.

## Instalación y ejecución

Se requiere Node.js 22.12 o superior y npm.

Desde la carpeta del proyecto:

npm install

Crear un archivo `.env` en la raíz del proyecto, junto a `package.json`, copiando `.env.example`:

```env
VITE_API_URL=https://oss.exercisedb.dev/api/v1/exercises
VITE_BACKEND_URL=http://localhost:4000
```

`.env` está ignorado por Git y no se sube al repositorio. Cada integrante debe crearlo localmente siguiendo las instrucciones anteriores. Las URL no están escritas dentro de los componentes: se leen en los servicios mediante `import.meta.env.VITE_API_URL` y `import.meta.env.VITE_BACKEND_URL`. Para iniciar sesión el backend debe estar en ejecución en la dirección indicada. Las variables `VITE_` son públicas en el frontend, por lo que no deben contener contraseñas ni claves privadas. Reiniciar Vite después de modificar `.env`. En Vercel configurar `VITE_API_URL` con el mismo valor para el entorno del deploy y volver a desplegar.

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
                       RutinaItem, FormularioRutina, ImagenIlustrativa,
                       FormularioAuth y RutaProtegida
  context/             AuthContext y AuthProvider (sesión compartida)
  data/contenido.js    Listas de navegación, ejercicios y rutinas
  hooks/useAuth.js     Acceso al usuario y a las acciones de sesión
  hooks/useAgenda.js   Estado de agenda y sincronización con localStorage
  hooks/useRutinas.js  Estado de rutinas propias y persistencia local
  hooks/useEjerciciosApi.js  Consulta externa, estado y manejo de errores
  services/ejerciciosApi.js  Axios y URL tomada de .env
  services/api.js      Instancia de Axios del backend con el token
  services/authApi.js  Login, registro y perfil
  utils/ejerciciosApi.js     Validación de datos y mensajes de error
  utils/auth.js        Validaciones, sesión en localStorage y mensajes
  utils/agenda.js      Fechas, validación y almacenamiento de la agenda
  utils/rutinas.js     Validación y almacenamiento de rutinas propias
  pages/               Inicio, Rutinas, Ejercicios, Calendario,
                       Progreso, Login, Registro y NoEncontrada
  App.jsx              Rutas y estado compartido
  main.jsx             Inicio de React y BrowserRouter
  index.css            Identidad visual y ajustes del calendario

Las páginas representan las vistas completas. Los componentes reciben datos y acciones mediante props. La navegación, las tarjetas, las rutinas, las semanas del calendario y el resumen usan `map()` con claves estables.


## Estrategias SEO aplicadas

- **Idioma y adaptación móvil:** `index.html` declara `lang="es"` y la etiqueta `viewport` para adaptar la página al dispositivo.
- **Títulos y descripciones:** cada página recibe un título y una descripción propios mediante `PageLayout`. Su `useEffect` actualiza `document.title` y la etiqueta `meta description` al navegar.
- **HTML semántico:** se utilizan `header`, `nav`, `main`, `section`, `article` y `footer` para identificar las partes del contenido. Las páginas tienen un encabezado principal `h1` y sus secciones utilizan `h2` y `h3`.
- **Imágenes:** las ilustraciones informativas tienen textos alternativos (`alt`) descriptivos. Las imágenes decorativas utilizan `alt=""`. La carga diferida (`loading="lazy"`) se aplica a las tarjetas, no a la imagen principal del inicio.
- **Direcciones descriptivas:** las rutas `/rutinas`, `/ejercicios`, `/calendario` y `/progreso` identifican cada sección. Los enlaces internos permiten recorrerlas.
- **Metadatos para compartir:** las etiquetas Open Graph definen el nombre del sitio, el título y la descripción; `PageLayout` actualiza estos dos últimos por página.
- **Página no encontrada:** la vista de una ruta desconocida utiliza `noindex, follow` para indicar que no debe indexarse como contenido normal.


## Iconos

Bootstrap Icons se instala como dependencia y se importa desde `src/main.jsx`. Vite publica sus estilos y fuentes con los archivos del proyecto, sin solicitar los iconos al CDN de jsDelivr. Así se evita esa dependencia externa que provocaba advertencias de prevención de seguimiento en el navegador.
