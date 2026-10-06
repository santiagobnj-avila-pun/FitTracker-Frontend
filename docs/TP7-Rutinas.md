# TP7: rutinas personalizadas

`useRutinas` centraliza el estado de las rutinas propias desde App. Las tres plantillas del catálogo no se modifican. App combina plantillas y rutinas propias para Inicio, Rutinas, Calendario y Progreso mediante props.

## useState

- `inicial`: resultado de leer y validar localStorage mediante una función inicializadora. No se vuelve a leer por cada render.
- `personales`: lista de rutinas creadas. Cambia al crear, editar o eliminar; los cambios producen nuevos arrays y objetos, sin mutar los anteriores.
- `errorGuardado`: aviso si no se pudo persistir la lista.
- En FormularioRutina, nombre, descripción, ejercicios, selector y error son estados del formulario. Cancelar descarta el borrador; guardar valida y actualiza la lista compartida.
- En Rutinas, los estados controlan el formulario abierto, la confirmación de eliminación y los mensajes.

## useEffect

El efecto de useRutinas sincroniza `personales` con localStorage. Sus dependencias son `[personales, habilitado]`: se ejecuta inicialmente y al cambiar la lista. Si falló la lectura, `habilitado` es falso y no se sobrescriben los datos anteriores. La lectura inicial pertenece al inicializador de useState, no al efecto.

El guardado es síncrono. Una microtarea actualiza el aviso de error; una variable `vigente` y la limpieza evitan avisos pendientes de una ejecución que ya fue reemplazada o desmontada. En StrictMode de desarrollo React puede repetir inicializadores y realizar un ciclo adicional de efecto y limpieza; guardar la misma lista no agrega duplicados.

## Reglas

- Nombre obligatorio, máximo 80 caracteres y sin repetir el de otra rutina.
- Descripción opcional, máximo 300 caracteres.
- Al menos un ejercicio del catálogo, sin duplicarlo.
- Series enteras entre 1 y 20; repeticiones entre 1 y 100 o segundos entre 1 y 600. Son límites de entrada, no una recomendación profesional.
- IDs estables con prefijo `personal-`, independientes del nombre. Editar conserva el ID para no romper el calendario.
- Eliminar requiere confirmación y se rechaza si hay cualquier fecha agendada con esa rutina. Las fechas pasadas se conservan como historial, por lo que también impiden eliminarla.
- Las rutinas creadas persisten al recargar; la selección de la rutina activa continúa siendo temporal.
- Almacenamiento local por navegador y origen, sin cuenta, servidor ni sincronización entre dispositivos.

## Comprobaciones

Crear desde cero o a partir de ejercicios seleccionados; validar nombre, cantidades y lista; cancelar sin guardar; editar sin duplicar; recargar para verificar persistencia; agendar una rutina propia; impedir eliminarla mientras está agendada; quitar su asignación futura y eliminar con confirmación; comprobar que la biblioteca predefinida permanece intacta.