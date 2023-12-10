// autenticacion.js

// Lógica para la autenticación usando Amazon Cognito
const poolData = {
    UserPoolId: 'tu-user-pool-id',
    ClientId: 'tu-client-id',
  };
  
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
  // Función para iniciar sesión
  function iniciarSesion(usuario, contrasena) {
    const authenticationData = {
      Username: usuario,
      Password: contrasena,
    };
  
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  
    const userData = {
      Username: usuario,
      Pool: userPool,
    };
  
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log('Inicio de sesión exitoso', result);
        // Redirigir a la página del foro u otra página después del inicio de sesión
        window.location.href = 'foro.html';
      },
      onFailure: function (err) {
        console.error('Error en inicio de sesión', err);
        // Manejar errores de inicio de sesión
      },
    });
  }
  
  // Función para cerrar sesión
  function cerrarSesion() {
    const cognitoUser = userPool.getCurrentUser();
  
    if (cognitoUser) {
      cognitoUser.signOut();
      // Redirigir a la página de inicio de sesión u otra página después del cierre de sesión
      window.location.href = 'login.html';
    }
  }
  
  // Función para verificar si el usuario está autenticado
  function usuarioAutenticado() {
    const cognitoUser = userPool.getCurrentUser();
    return cognitoUser !== null;
  }
  
  // Función para obtener el usuario autenticado
  function obtenerUsuarioAutenticado() {
    const cognitoUser = userPool.getCurrentUser();
  
    if (cognitoUser) {
      return cognitoUser.getUsername();
    }
  
    return null;
  }
  
  // Asociar funcionalidad de inicio de sesión al botón
$(document).ready(function () {
    // Seleccionar el botón por su ID (asegúrate de ajustar el ID según tu HTML)
    const btnIniciarSesion = $('#btnIniciarSesion');
  
    // Agregar un evento de clic al botón
    btnIniciarSesion.click(function () {
      // Llamar a la función de inicio de sesión
      iniciarSesionUsuario();
    });
  
    // Función para iniciar sesión (puedes ajustar esta función según tus necesidades)
    function iniciarSesionUsuario() {
      // Implementar la lógica de inicio de sesión
      // Por ejemplo, podrías redirigir a la página de inicio de sesión
      window.location.href = 'login.html';
    }
  });