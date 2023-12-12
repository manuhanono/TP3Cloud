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
        // Aquí puedes realizar cualquier lógica adicional con los datos obtenidos
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  }
  
  // Asocia la función enviarComentario al evento del botón
  document.getElementById('enviarComentario').addEventListener('click', enviarComentario);
  
  // Llama a la función para cargar las opciones al cargar la página
  window.addEventListener('load', cargarOpcionesPeliculas);
  


const apiUrl2 = "https://sv5jf4u1pk.execute-api.us-east-1.amazonaws.com/dev/myresource";

// Datos que deseas enviar en el cuerpo de la solicitud
const data = {
    username: "usuario_prueba",
    message: "Hola, este es un comentario de prueba.",
    channel: "canal_prueba"
    Puntaje: "aaa"
};

// Configuración de la solicitud
const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
};

// Realiza la solicitud utilizando Fetch API
fetch(apiUrl2, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud - ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
