// Función para cargar las opciones de películas
function cargarOpcionesPeliculas() {
  // Realizar la API call para obtener la lista de películas desde tu API Gateway
  const apiUrl = 'https://6lbqfzpzp8.execute-api.us-east-1.amazonaws.com/dev/myresource';

  // Realizar la solicitud utilizando Fetch API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Obtener el elemento select
      const selectPelicula = document.getElementById('pelicula');

      // Limpiar opciones existentes
      selectPelicula.innerHTML = '';

      // Agregar las opciones al elemento select
      data.peliculas.forEach(pelicula => {
        const option = document.createElement('option');
        option.value = pelicula; // Puedes ajustar esto si hay un ID único
        option.text = pelicula;
        selectPelicula.appendChild(option);
      });
    })
    .catch(error => console.error('Error al cargar opciones de películas:', error));
}

// Llama a la función para cargar las opciones al cargar la página
window.addEventListener('load', cargarOpcionesPeliculas);



function enviarComentario() {
    const comentario = document.getElementById('comentario').value;
    const selectPelicula = document.getElementById('pelicula');
    const canalSeleccionado = selectPelicula.options[selectPelicula.selectedIndex].value;
  
    // Muestra el comentario y el canal en la consola
    console.log('Comentario:', comentario);
    console.log('Canal Seleccionado:', canalSeleccionado);
  
    // Realizar la API call con el valor del canal seleccionado
    const apiGatewayUrl = 'https://ct5hbglvqj.execute-api.us-east-1.amazonaws.com/dev/myresource';
    const apiUrl = `${apiGatewayUrl}?query_canal=${canalSeleccionado}`;
  
    // Llama a la función para hacer la API call
    hacerApiCall(apiUrl);
  }
  
  // Función para hacer la API call
  function hacerApiCall(url) {
    console.log('Realizando API call a:', url);
  
    // Realizar la solicitud utilizando Fetch API
    fetch(url)
      .then(response => {
        console.log('Respuesta de la API:', response);
  
        if (!response.ok) {
          throw new Error(`Error de red - ${response.status}`);
        }
  
        return response.json();
      })
      .then(data => {
        console.log('Datos obtenidos:', data);

           // Mostrar los comentarios 
      const listaComentarios = document.getElementById('listaComentarios');
      listaComentarios.innerHTML = ''; // Limpiar comentarios anteriores

      if (data || data.html || data.html.length > 0) {
        data.html.forEach(comentario => {
          const comentarioDiv = document.createElement('div');
          comentarioDiv.textContent = `Canal: ${comentario.Canal.S}, Comentario: ${comentario.Comentario.S}, Puntaje: ${comentario.Puntaje.N}`;
          listaComentarios.appendChild(comentarioDiv);
        });
      } else {
        const mensajeSinComentarios = document.createElement('p');
        mensajeSinComentarios.textContent = 'No hay comentarios para esta película.';
        listaComentarios.appendChild(mensajeSinComentarios);
      }

      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  }
  
  // Asocia la función enviarComentario al evento del botón
  document.getElementById('enviarComentario').addEventListener('click', enviarComentario);
 //document.getElementById('pelicula').addEventListener('change', cargarComentarios);

  
  // Llama a la función para cargar las opciones al cargar la página
  window.addEventListener('load', cargarOpcionesPeliculas);
  