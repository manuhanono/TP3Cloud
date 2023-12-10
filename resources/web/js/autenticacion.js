
//VERIFIQUE QUE FUNCIONA SIN COGNITO. LA LOGICA REDIRECCIONA A LOGIN CUANDO NO HAY USUARIO AUTENTICADO
//PROBAR CON COGNITO. EN CASO DE ESTAR LOGIN, TE MANDA AL FORO. EN CASO DE QUE NO, AL LOGIN
// Configuración de Amazon Cognito
const poolData = {
    UserPoolId: 'tu_user_pool_id',
    ClientId: 'tu_app_client_id'
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Función para verificar si el usuario está autenticado
function verificarAutenticacion(event) {
  // Evitar que el enlace se abra de inmediato
  event.preventDefault();

  // Utilizar las funciones de Cognito para verificar la autenticación
  const usuarioActual = AmazonCognitoIdentity.CognitoUserPool.getCurrentUser();

  if (usuarioActual) {
    // El usuario está autenticado, redirige a foro.html
    window.location.href = event.target.href;
  } else {
    // El usuario no está autenticado, redirige al login de Cognito
    window.location.href = 'login.html';

  }
}
/*
function verificarAutenticacion(event) {
  // Evitar que el enlace se abra de inmediato
  event.preventDefault();

  // Utilizar las funciones de Cognito para verificar la autenticación
  const usuarioActual = 'SOL'

  if (usuarioActual=='SOL') {
    // El usuario está autenticado, redirige a foro.html
    window.location.href = event.target.href;
  } else {
    // El usuario no está autenticado, redirige al login de Cognito
    window.location.href = 'login.html';
  }}

*/

// Asociar la función al evento de clic en el enlace "FORO"
document.getElementById('botonForo').addEventListener('click', verificarAutenticacion);

