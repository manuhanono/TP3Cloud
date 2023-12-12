    // URL del endpoint de tu API Gateway
const apiGatewayUrl = 'https://1kpho6lka1.execute-api.us-east-1.amazonaws.com/dev/myresource';

// Elemento HTML para el campo de búsqueda
const buscadorInput = document.getElementById('Buscador');

// Elemento HTML para mostrar el mensaje de error
const mensajeErrorElemento = document.querySelector('.mensaje-error');

// Función para realizar la búsqueda
function realizarBusqueda() {
    console.log('Entrando en realizarBusqueda');
    
    // Obtiene el valor del campo de búsqueda
    const valorBuscador = buscadorInput.value;
    console.log('Valor del buscador:', valorBuscador);

    // Parámetros de búsqueda
    const buscador = valorBuscador;
    const media = 'movies';

    // Construye la URL con los parámetros
    const apiUrl = `${apiGatewayUrl}?buscador=${buscador}&media=${media}`;
    console.log('URL de la API:', apiUrl);

    // Realiza la solicitud utilizando Fetch API
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('Datos de la Lambda:', data);
        
         // Accede a los valores específicos de la respuesta JSON
         const posterPath = data.html[0]["Poster Path"].S;
         const titulo = data.html[0].Nombre.S;
         const sinopsis = data.html[0].Sinopsis.S;
 
         // Asigna los valores a los elementos HTML
         let imagen = document.querySelector(".imagen");
         let tituloElemento = document.querySelector(".titulo");
         let sinopsisElemento = document.querySelector(".sinopsis");
 
         // Asigna los valores a los elementos HTML
         imagen.src = posterPath;
         tituloElemento.innerHTML = titulo;
         sinopsisElemento.innerHTML = sinopsis;


    })
    .catch(function (error) {
        console.log(error);
    })
}

buscadorInput.addEventListener('input', realizarBusqueda);
