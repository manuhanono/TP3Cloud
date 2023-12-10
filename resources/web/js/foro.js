// foro.js

// Lógica para interactuar con DynamoDB y manejar el foro
$(document).ready(function () {
    // Verificar si el usuario está autenticado antes de mostrar la página del foro
    if (!usuarioAutenticado()) {
      // Redirigir a la página de inicio de sesión u otra página de acceso
      window.location.href = 'login.html';
    }
  
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
  
  });
  