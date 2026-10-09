# TP8 — Consumo de API pública

## API y funcionalidad

ExerciseDB, versión gratuita pública de AscendAPI. Se consulta el listado de ejercicios en una pestaña independiente, sin reemplazar el catálogo con la mascota. La API permite consultas HTTPS sin clave en su endpoint público. Documentación: https://oss.exercisedb.dev/docs.

Se muestran nombre, grupo corporal, equipamiento, músculos principales/secundarios e instrucciones originales en inglés. Las tarjetas muestran un fotograma quieto del ejercicio, dibujado una sola vez en un canvas al cargar la imagen. La API proporciona GIFs, por lo que se descarga el GIF con carga diferida mediante loading="lazy" para obtener ese fotograma, pero la animación no se muestra hasta pulsar Ver demostración. Ocultar GIF vuelve a la misma vista previa quieta. Si falla un GIF, aparece la imagen de respaldo. Los ejercicios externos no se agregan automáticamente a las rutinas locales. La atribución al proveedor está visible. El uso de la versión gratuita es educativo/no comercial y tiene límites de consultas.

La imagen de respaldo es `public/img/mascota-demostracion-no-disponible.png`: muestra la mascota con una lupa cuando falta el GIF o falla su carga. Mientras se espera la vista previa se muestra un indicador de carga, no esa ilustración. Las instrucciones siguen disponibles aunque falle la demostración.

## Variables de entorno

`.env` contiene VITE_API_URL y está ignorado por Git. `.env.example` comparte la URL pública para que cada integrante prepare su archivo local. En Vercel se configura la misma variable antes de compilar y publicar. Reiniciar Vite si cambia la variable.

El servicio obtiene la URL con `const API_URL = import.meta.env.VITE_API_URL`. No existe una URL alternativa hardcodeada: si falta o no es HTTPS válida, la aplicación informa el error sin consultar una dirección incorrecta. Las variables VITE_ se incluyen en el frontend y no son una forma de ocultar secretos.

## Axios

`obtenerEjercicios` llama a `axios.get(API_URL, opciones)`. Las opciones incluyen limit=8, name, bodyParts y after; se usa timeout de 15 segundos y una señal AbortController. El cursor nextCursor de la respuesta se envía como after para avanzar, no como número de página ni offset. Se guardan los cursores anteriores para retroceder. Los resultados se validan antes de mostrarse; no se inyecta HTML de la API.

## useState

- Explorador: campos del formulario, consulta confirmada y cursores anteriores.
- Hook: resultados, total, siguiente cursor, error y un contador de reintento.
- Tarjeta: modal de instrucciones, GIF visible, vista previa lista y fallo de imagen. useRef conserva la referencia al canvas donde se dibuja el fotograma quieto.

La carga se deriva comparando la clave de la consulta actual con la de la respuesta terminada. Mientras no coincidan aparece el indicador y no se muestran resultados de otra consulta como si fueran actuales. Escribir en el formulario no consulta por cada tecla: Buscar confirma los filtros.

## useEffect

La petición se realiza dentro del efecto del hook. Sus dependencias son `[nombre, grupo, despues, intento]`. Se ejecuta al montar la pestaña externa y cuando cambian los filtros confirmados, el cursor o el contador de reintento. La pestaña usa mountOnEnter/unmountOnExit: no consulta al abrir el catálogo local, y al salir cancela la petición pendiente. No depende de los resultados que actualiza, por lo que no crea un ciclo de peticiones.

La limpieza aborta la petición y cierra el aviso propio si está abierto. Las cancelaciones no muestran errores. Antes de aplicar la respuesta se verifica que no esté abortada, evitando resultados atrasados al cambiar de consulta. StrictMode puede iniciar y cancelar una petición adicional en desarrollo; no se desactiva.

## Errores y SweetAlert2

Se informa configuración ausente, timeout, límite 429, rechazo de acceso, respuesta inválida y fallos de red. Se conserva un mensaje en la sección y se llama a `Swal.fire` con título, texto e ícono de error, sin HTML remoto. Se puede reintentar manualmente. Si falla la API, el catálogo local y las rutinas siguen disponibles: no se finge una respuesta exitosa usando datos locales.

## Verificación

1. Instalar las dependencias y configurar .env.
2. Abrir Ejercicios: se mantiene el catálogo de 48 ilustraciones de la mascota.
3. Abrir Explorar más ejercicios: observar carga y resultados obtenidos por HTTP.
4. Buscar bench y filtrar Pecho; comprobar resultados y cambiar de página.
5. Retroceder, limpiar filtros y consultar instrucciones o una demostración.
6. Buscar un nombre sin coincidencias: aparece un estado vacío, no un error de red.
7. Para probar el manejo de error, desconectar la conexión o configurar una URL de prueba incorrecta, reiniciar Vite y abrir la pestaña externa. Debe aparecer SweetAlert2, mensaje y Reintentar. Restaurar la configuración real al terminar.
8. Revisar `git check-ignore .env`: debe estar ignorado. No subirlo a GitHub.

Comandos: npm run lint; npm run build; node --test tests/agenda.test.mjs tests/rutinas.test.mjs tests/ejerciciosApi.test.mjs.