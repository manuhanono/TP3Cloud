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
        window.location.href = 'https://d1i2ps8v0vw7sh.cloudfront.net/foro.html';
      });
    } else {
      // El usuario no está autenticado, redirige al login de Cognito
      window.location.href = 'https://dominioparacrearusuarios12345.auth.us-east-1.amazoncognito.com/login?client_id=7u525asb2pf0q0fud6fh1hn5n7&response_type=code&scope=email+openid&redirect_uri=https%3A%2F%2Fd1i2ps8v0vw7sh.cloudfront.net%2Flogin.html'; //CAMBIAR POR WEB
    }
  }
  
  // Agregar el evento de clic al botónForo
  document.getElementById('botonForo').addEventListener('click', verificarAutenticacion);