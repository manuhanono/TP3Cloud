function verificarAutenticacion(event) {
    // Evitar que el enlace se abra de inmediato
    event.preventDefault();
  
    // Utilizar las funciones de Cognito para verificar la autenticación
    const usuarioActual = userPool.getCurrentUser();
  
    if (usuarioActual) {
      // Verifica la sesión actual del usuario
      usuarioActual.getSession((err, session) => {
        if (err) {
          console.error(err);
          return;
        }
  
        // El usuario está autenticado, redirige a foro.html
        window.location.href = 'foro.html';
      });
    } else {
      // El usuario no está autenticado, redirige al login de Cognito
      window.location.href = '.....'; //CAMBIAR POR WEB
    }
  }
  
  // Agregar el evento de clic al botónForo
  document.getElementById('botonForo').addEventListener('click', verificarAutenticacion);