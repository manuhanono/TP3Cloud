function verificarAutenticacion(event) {
  // Evitar que el enlace se abra de inmediato
  event.preventDefault();
  
  AWS.config.region = 'us-east-1';  // replace with your AWS region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1_zh8H4WxGm',  // replace with your Cognito Identity Pool ID
  });
  console.log(AWS.CognitoUserPool)

  var poolData = {
    UserPoolId: 'us-east-1_zh8H4WxGm', 
    ClientId: '7vel4nc12cbipbvn366jdbc1h1',   
};

  var userPool = new AWS.AmazonCognitoIdentity.CognitoUserPool(poolData);
  var usuarioActual = userPool.getCurrentUser();

  // const userPool = new AWS.CognitoUserPool('us-east-1_zh8H4WxGm');

  // // Utilizar las funciones de Cognito para verificar la autenticación
  // const usuarioActual = userPool.getCurrentUser();

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
    window.location.href = 'https://dominioparacrearusuarios12345.auth.us-east-1.amazoncognito.com/login?client_id=7vel4nc12cbipbvn366jdbc1h1&response_type=code&scope=email+openid&redirect_uri=https%3A%2F%2Fd1i2ps8v0vw7sh.cloudfront.net%2Fforo.html';
  }
}
<<<<<<< HEAD
// Asociar la función al evento de clic en el enlace "FORO"
document.getElementById('botonForo').addEventListener('click', verificarAutenticacion);

//NUEVO AGARRANDO ID DE URL
/*function verificarAutenticacion() {
  const urlParams = new URLSearchParams(window.location.search);
  const idUsuario = urlParams.get('code');

  if (idUsuario) {
      // El usuario está autenticado, permite el acceso a foro.html
      window.location.href = 'foro.html';
  } else {
      // El usuario no está autenticado, redirige a la página de inicio de sesión
      window.location.href = 'iniciar_sesion.html';
  }
}

verificarAutenticacion(); */

// autenticacion.js



=======

// Agregar el evento de clic al botónForo
//document.getElementById('botonForo').addEventListener('click', verificarAutenticacion);

document.addEventListener('DOMContentLoaded', verificarAutenticacion);
// // Configuración de Amazon Cognito
// const poolData = {
//     UserPoolId: 'us-east-1_zh8H4WxGm',
//     ClientId: '7vel4nc12cbipbvn366jdbc1h1'
// };

// console.log(AmazonCognitoIdentity);

// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData); 

// // Función para verificar si el usuario está autenticado
// function verificarAutenticacion(event) {
//   // Evitar que el enlace se abra de inmediato
//   event.preventDefault();

//   // Utilizar las funciones de Cognito para verificar la autenticación
//   const usuarioActual = userPool.getCurrentUser();

//   if (usuarioActual) {
//     // El usuario está autenticado, redirige a foro.html
//     window.location.href = event.target.href;
//   } else {
//     // El usuario no está autenticado, redirige al login de Cognito
//     window.location.href = 'https://dominioparacrearusuarios12345.auth.us-east-1.amazoncognito.com/login?client_id=7u525asb2pf0q0fud6fh1hn5n7&response_type=code&scope=email+openid&redirect_uri=https%3A%2F%2Fd1i2ps8v0vw7sh.cloudfront.net%2Flogin.html';

//   }
// }
// // Asociar la función al evento de clic en el enlace "FORO"
// document.getElementById('botonForo').addEventListener('click', verificarAutenticacion);
>>>>>>> e489c2ff5bdfd7958baee3a38fa4ba5066af21bb
