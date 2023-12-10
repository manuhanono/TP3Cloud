//falla enviar, no envia nada. probar alternativas

// foro.js


// Lógica para cargar las opciones de película desde la API Gateway/Lambda/DynamoDB
//function cargarOpcionesPeliculas() {
  // Aquí debes implementar la llamada a tu API Gateway para obtener las opciones de películas
  // y llenar dinámicamente el select con las opciones recibidas
  // Puedes utilizar jQuery.ajax o Fetch API para realizar la llamada
//}

// Lógica para enviar el comentario a DynamoDB
//function enviarComentario() {
  //const peliculaSeleccionada = document.getElementById('pelicula').value;
  //const comentario = document.getElementById('comentario').value;

  // Aquí debes implementar la llamada a tu API Gateway que se conecta con Lambda y DynamoDB
  // para guardar el comentario, la película, la fecha, el horario y el nombre del usuario
  // Puedes utilizar jQuery.ajax o Fetch API para realizar la llamada
//}

/* Cargar las opciones de película cuando la página esté lista
$(document).ready(function() {
  cargarOpcionesPeliculas();
});

*/

// Archivo formulario.js

// Lógica para probar la funcionalidad de enviar el comentario
function enviarComentario() {
  const comentario = document.getElementById('comentario').value;

  // Muestra el comentario en la consola (simula la llamada al backend)
  console.log('Comentario:', comentario);
  console.log('¡Llamada al backend simulada con éxito!');
}
document.getElementById('enviarComentario').addEventListener('click', enviarComentario);


/*

    // Lógica para guardar un comentario en el foro
    function guardarComentario(comentario) {
        const params = {
            TableName: 'foro', // Reemplaza con el nombre de tu tabla en DynamoDB
            Item: {
              Usuario: comentario.usuario,
              Contenido: comentario.contenido,
              Fecha: new Date().toISOString() // Puedes ajustar el formato de fecha según tus preferencias
      // Implementa la lógica para guardar comentarios en DynamoDB
    }}}
  
    // Lógica para obtener todos los comentarios del foro
    function obtenerComentarios() {
        const params = {
          TableName: 'foro' // Reemplaza con el nombre de tu tabla en DynamoDB
          // Puedes agregar más parámetros según tu modelo de datos
        };
      
        // Utilizar el método scan de DynamoDB para obtener todos los comentarios
        dynamoDB.scan(params, (err, data) => {
          if (err) {
            console.error('Error al obtener comentarios:', err);
          } else {
            console.log('Comentarios recuperados:', data.Items);
            // Puedes llamar a mostrarComentarios(data.Items) o realizar otras acciones con los comentarios recuperados
          }
        });
      }
      
        
        // Lógica para mostrar los comentarios en la página
    // Lógica para mostrar los comentarios en la página
function mostrarComentarios(comentarios) {
    // Selecciona el contenedor donde se mostrarán los comentarios (ajusta el selector según tu HTML)
    const contenedorComentarios = $('.contenedor-comentarios');
  
    // Limpia cualquier contenido anterior
    contenedorComentarios.empty();
  
    // Itera sobre los comentarios y agrega cada uno al DOM
    comentarios.forEach(comentario => {
      // Crea un nuevo elemento div para representar el comentario
      const comentarioElemento = $('<div>', {
        class: 'comentario'
      });
  
      // Crea elementos para mostrar el contenido y el usuario del comentario
      const contenidoElemento = $('<p>', {
        text: comentario.contenido
      });
      const usuarioElemento = $('<p>', {
        text: `Usuario: ${comentario.usuario}`
      });
  
      // Agrega los elementos al comentarioElemento
      comentarioElemento.append(contenidoElemento, usuarioElemento);
  
      // Agrega el comentarioElemento al contenedorComentarios
      contenedorComentarios.append(comentarioElemento);
    });
  }
  
  
    // Lógica para enviar el formulario de comentarios
    $('form').submit(function (event) {
      event.preventDefault();
      const comentario = {
        usuario: obtenerUsuarioAutenticado(),
        contenido: $('#contenidoComentario').val(),
      };
  
      // Guardar el comentario
      guardarComentario(comentario);
  
      // Recargar y mostrar comentarios actualizados
      obtenerComentarios();
    });
  
*/
  