
// Configuración de Amazon Cognito
const poolData = {
    UserPoolId: 'us-east-1_zh8H4WxGm',
    ClientId: '7vel4nc12cbipbvn366jdbc1h1'
};

console.log(AmazonCognitoIdentity);

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData); 

// Función para verificar si el usuario está autenticado
function verificarAutenticacion(event) {
  // Evitar que el enlace se abra de inmediato
  event.preventDefault();

  // Utilizar las funciones de Cognito para verificar la autenticación
  const usuarioActual = userPool.getCurrentUser();

  if (usuarioActual) {
    // El usuario está autenticado, redirige a foro.html
    window.location.href = event.target.href;
  } else {
    // El usuario no está autenticado, redirige al login de Cognito
    window.location.href = 'https://dominioparacrearusuarios12345.auth.us-east-1.amazoncognito.com/login?client_id=7u525asb2pf0q0fud6fh1hn5n7&response_type=code&scope=email+openid&redirect_uri=https%3A%2F%2Fd1i2ps8v0vw7sh.cloudfront.net%2Flogin.html';

  }
}
// Asociar la función al evento de clic en el enlace "FORO"
document.getElementById('botonForo').addEventListener('click', verificarAutenticacion);