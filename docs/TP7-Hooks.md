# TP7 — Hooks aplicados al calendario de Fit Tracker

## Funcionalidad

El usuario selecciona un día desde hoy en adelante, elige una rutina y la agenda. Puede cambiar esa rutina o quitarla en fechas actuales o futuras. Se permite una rutina por día y los días con entrenamiento se marcan. Las fechas pasadas son de solo lectura y conservan el historial. La agenda persiste en el mismo navegador mediante localStorage; no hay una base de datos ni sincronización entre dispositivos.

## useState: qué estado manejamos y por qué

En Calendario.jsx:

- fecha: determina el mes y el año visibles. Cambia con las flechas o al volver al mes actual.
- edicion: contiene la fecha seleccionada y el ID de rutina del formulario. Cambia al tocar un día, elegir una opción o cerrar el modal.
- mensaje: informa el resultado de agendar, editar o quitar.
- confirmarReinicio: controla el modal que solicita autorización antes de reemplazar una agenda dañada.

En useAgenda.js:

- inicial: conserva el resultado de leer y validar localStorage al iniciar.
- agenda: guarda la lista de asignaciones con fecha y rutinaId. Cambia al agendar, reemplazar o quitar un entrenamiento.
- habilitado: evita sobrescribir datos locales que no pudieron leerse. Cambia si el usuario confirma empezar una agenda nueva.
- errorGuardado: informa si el navegador no permite guardar.

Usamos estado porque estos valores cambian con las acciones del usuario y React necesita volver a renderizar para mostrar los cambios. Se actualizan con sus setters, sin modificar directamente los arrays. Las actualizaciones que dependen de la agenda anterior utilizan la forma funcional: setAgenda(actual => ...).

## useEffect: cuándo se ejecuta y para qué

El efecto de useAgenda sincroniza la agenda de React con localStorage. Se ejecuta después del montaje y cuando cambia agenda o habilitado. No se guarda dentro del render.

Dependencias: [agenda, habilitado].

- agenda: provoca un nuevo guardado al agregar, cambiar o quitar asignaciones.
- habilitado: permite guardar una agenda nueva solamente después de la autorización del usuario si los datos iniciales estaban dañados.

Cambiar el mes, abrir el modal o elegir una rutina sin confirmar no modifica agenda, por lo que no provoca un nuevo guardado.

La lectura inicial se hace con un inicializador de useState, no con otro efecto. Esto evita comenzar con un array vacío y sobrescribir la agenda antes de recuperarla. En StrictMode, React puede repetir inicializadores y efectos durante el desarrollo; la lectura no modifica datos y guardar el mismo contenido es seguro.

La escritura en localStorage es sincrónica. El aviso de error se actualiza en una microtarea, y la limpieza del efecto invalida los avisos pendientes cuando aparece una versión nueva del estado o se desmonta el componente.

## Verificación

1. Abrir Calendario y seleccionar hoy o un día futuro.
2. Elegir una rutina y confirmar Agendar.
3. Ver el marcador del día y el entrenamiento en la lista del mes.
4. Navegar a otra página, volver y recargar: la asignación se conserva.
5. Editar el mismo día: cambia la rutina, no se agrega otra asignación.
6. Quitar el entrenamiento: desaparece del calendario y de la lista, incluso después de recargar.
7. Navegar entre diciembre y enero y comprobar la alineación de los días.
8. Comprobar que los días anteriores a hoy están bloqueados y las asignaciones pasadas siguen visibles.

Pruebas automáticas: node --test tests/agenda.test.mjs.