// Archivo formulario.js

//datos para simular rta de lambda
const comentariosDePrueba = [
  'Comentario de prueba 1',
  'Comentario de prueba 2',
  'Comentario de prueba 3',
];

function cargarOpcionesPeliculas() {
  // Llamada a la Lambda o cualquier otra lógica para obtener las películas
  // Simulación de opciones de películas
  const peliculas = ['Película 1', 'Película 2', 'Película 3'];

  // Obtener el elemento select
  const selectPelicula = document.getElementById('pelicula');

  // Limpiar opciones existentes (por si acaso)
  selectPelicula.innerHTML = '';

  // Agregar las opciones al elemento select
  peliculas.forEach((pelicula) => {
    const opcion = document.createElement('option');
    opcion.value = pelicula;
    opcion.textContent = pelicula;
    selectPelicula.appendChild(opcion);
  });
}

// Llama a la función para cargar las opciones al cargar la página
window.addEventListener('load', cargarOpcionesPeliculas);


// Lógica para probar la funcionalidad de enviar el comentario
function enviarComentario() {
  const comentario = document.getElementById('comentario').value;

  // Muestra el comentario en la consola (simula la llamada al backend)
  console.log('Comentario:', comentario);
  console.log('¡Llamada al backend simulada con éxito!');

  comentariosDePrueba.push(comentario);


  mostrarComentarios(comentariosDePrueba);

  actualizarListaComentarios(); 
}

async function actualizarListaComentarios() {
  try {
    // Realizar una solicitud a la Lambda que obtiene los comentarios
    const response = await fetch('URL_DE_TU_LAMBDA', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de comentarios.');
    }
    // Convertir la respuesta a JSON
    const comentarios = await response.json();

    // Mostrar los comentarios en la página
    mostrarComentarios(comentarios);
  } catch (error) {
    console.error('Error al obtener comentarios:', error.message);
    // Puedes manejar el error de la manera que prefieras (por ejemplo, mostrar un mensaje al usuario).
  }
}

function mostrarComentarios(comentarios) {
  const listaComentarios = document.getElementById('listaComentarios');
  listaComentarios.innerHTML = ''; // Limpiar la lista antes de agregar nuevos comentarios

  if (comentarios.length === 0) {
    listaComentarios.innerHTML = '<p>No hay comentarios aún.</p>';
  } else {
    comentarios.forEach((comentario) => {
      const elementoComentario = document.createElement('p');
      elementoComentario.textContent = comentario;
      listaComentarios.appendChild(elementoComentario);
    });
  }
}


document.getElementById('enviarComentario').addEventListener('click', enviarComentario);
window.addEventListener('load', actualizarListaComentarios);


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
  