# FitTracker-Frontend
Fit Tracker
Integrantes
Facundo Martín Morán
Santiago Benjamin Avila Puntano
Leandro Joel López
Fabricio Sergio Lazarte
Descripción breve
Fit Tracker es una aplicación web para organizar rutinas de entrenamiento, consultar ejercicios, planificar sesiones en un calendario y seguir el progreso. Utiliza Bootstrap y JavaScript con manipulación del DOM y eventos, manteniendo la identidad visual negra y naranja y el diseño responsive.

El catálogo reúne 48 ejercicios (6 por grupo muscular), con búsqueda, filtros, favoritos y detalles. Se pueden crear, editar, duplicar y eliminar rutinas, personalizar series, repeticiones, cargas y descansos, y programarlas en el calendario. Al entrenar se registran las series realizadas; el resumen, las métricas, los récords y el historial se actualizan con esos datos. El temporizador permite iniciar, pausar y reiniciar descansos. Las plantillas son ejemplos editables, no planes profesionales personalizados.

El perfil es local y no constituye un login seguro. Las rutinas, la planificación y las sesiones, incluso la sesión en curso, se guardan con localStorage solo en el navegador actual; no hay contraseñas, sincronización ni base de datos en esta etapa. Desde Perfil se puede descargar una copia JSON. Si el navegador bloquea el guardado, la aplicación lo informa. Los 42 ejercicios de pecho, espalda, piernas, glúteos, hombros, bíceps y tríceps cuentan con ilustraciones de la mascota; los 6 ejercicios de abdomen muestran un marcador de ilustración pendiente. La estructura del catálogo admite nuevas entradas, imágenes y enlaces de video en el futuro.
