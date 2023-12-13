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

      if (data.html.length > 0) {
        data.html.forEach(comentario => {
          const comentarioDiv = document.createElement('div');
          comentarioDiv.classList.add('comentario'); // Agrega la clase "comentario"

          //comentarioDiv.textContent = `Pelicula: ${comentario.Canal.S}, Comentario: ${comentario.Comentario.S}, Puntaje: ${comentario.Puntaje.N}`;
          //comentarioDiv.textContent = `Pelicula: ${comentario.Canal.S}\nComentario: ${comentario.Comentario.S}\nPuntaje: ${comentario.Puntaje.N}`;
          comentarioDiv.innerHTML = `
            <p><strong></strong> ${comentario.Comentario.S}</p>
            <p><strong>Puntaje:</strong> ${comentario.Puntaje.N}</p>
        `;
          listaComentarios.appendChild(comentarioDiv);
        });
      } else {
        const mensajeSinComentarios = document.createElement('p');
        mensajeSinComentarios.textContent = 'No hay comentarios para esta película.';
        const comentarioDiv = document.createElement('div');
        comentarioDiv.innerHTML = `
        <p><strong></strong> 'No hay comentarios para esta película.' </p>
    `;


        listaComentarios.appendChild(mensajeSinComentarios);
      }

      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  }
  
  // Asocia la función enviarComentario al evento del botón
  document.getElementById('verComentario').addEventListener('click', enviarComentario);
 //document.getElementById('pelicula').addEventListener('change', cargarComentarios);

  
  // Llama a la función para cargar las opciones al cargar la página
  window.addEventListener('load', cargarOpcionesPeliculas);

  function cargarPuntaje() {
    // Llamada a la Lambda o cualquier otra lógica para obtener las películas
    // Simulación de opciones de películas
    const puntaje = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  
    // Obtener el elemento select
    const selectPuntaje = document.getElementById('puntaje');
  
    // Agregar las opciones al elemento select
    puntaje.forEach((puntaje) => {
        const opcion = document.createElement('option');
        opcion.value = puntaje;
        opcion.textContent = puntaje;
        selectPuntaje.appendChild(opcion);
  });
}

window.addEventListener('load', cargarPuntaje);

const apiUrl2 = "https://sv5jf4u1pk.execute-api.us-east-1.amazonaws.com/dev/myresource";


// Función para enviar un comentario
function guardarComentario() {
  // Obtener los valores de los elementos de entrada
  const message = document.getElementById('comentario').value;
  const channel = document.getElementById('pelicula').value;
  const puntaje = document.getElementById('puntaje').value;

  // Verificar que todos los campos estén completos
  if (!message || !channel || !puntaje) {
      alert('Por favor, completa todos los campos.');
      return;
  }

  // Crear el objeto de datos
  const data = {
      username: "usuario_prueba",
      message: message,
      Canal: channel,
      Puntaje: puntaje
  };

  var jsonData = JSON.stringify(data);

  const requestBody = {body: jsonData};

  // Realizar la API call para guardar en DynamoDB
  //const apiUrl2 =  "https://djiazzn75h.execute-api.us-east-1.amazonaws.com/dev/myresource";
  const apiUrl2 =  'https://djiazzn75h.execute-api.us-east-1.amazonaws.com/dev/myresource'

//   const comentarioDiv = document.createElement('div');
//   comentarioDiv.innerHTML = `
//   <p><strong></strong> 'Cargando.....' </p>
// `;

  fetch(apiUrl2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      'body': JSON.stringify(requestBody)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Error de red - ${response.status}`);
      }
      return response.json();
  })
  .then(responseData => {
      console.log('Comentario guardado con éxito:', responseData);
  })
  .catch(error => {
      console.error('Error al guardar el comentario:', error);
  });
}

// Asociar la función al evento de clic del botón
document.getElementById('enviarComentario').addEventListener('click', guardarComentario);


