// URL del endpoint de tu API Gateway
const apiGatewayUrl = 'https://1kpho6lka1.execute-api.us-east-1.amazonaws.com/dev/myresource';

// Elemento HTML para el campo de búsqueda
const buscadorInput = document.getElementById('Buscador');

// Elemento HTML para mostrar el mensaje de error
const mensajeErrorElemento = document.querySelector('.mensaje-error');

// Elementos HTML para mostrar la información de la película
const imagen = document.querySelector(".Poster Path");
const nombre = document.querySelector(".Nombre");
const fechaEstreno = document.querySelector(".fechaEstreno");
const sinopsis = document.querySelector(".Sinopsis");

// Función para realizar la búsqueda
function realizarBusqueda() {
    console.log('Entrando en realizarBusqueda');
    
    // Obtiene el valor del campo de búsqueda
    const valorBuscador = buscadorInput.value;
    console.log('Valor del buscador:', valorBuscador);

    // Parámetros de búsqueda
    const buscador = valorBuscador;

    // Construye la URL con los parámetros
    const apiUrl = `${apiGatewayUrl}?buscador=${buscador}}`;
    console.log('URL de la API:', apiUrl);

    // Realiza la solicitud utilizando Fetch API
    fetch(apiUrl)
        .then(response => {
            console.log('Respuesta de la API:', response);
            if (!response.ok) {
                throw new Error(`Error de red - ${response.status}`);
            }
            return response.json();
        })
        
        .then(function (data) {
            console.log('Datos de la Lambda:', data);


            // Verifica si hay resultados en el array "html"
            if (data.html && data.html.length > 0) {
                const primeraPelicula = data.html[0];
                
                // Establece la imagen si está disponible, de lo contrario, utiliza una imagen predeterminada
                imagen.src = primeraPelicula["Poster Path"] ? `https://image.tmdb.org/t/p/original/${primeraPelicula["Poster Path"].S}` : "./img/noImage.png";
                
                // Asigna el resto de la información al DOM
                Nombre.innerHTML = primeraPelicula["Nombre"] ? primeraPelicula["Nombre"].S : '';
                fechaEstreno.innerHTML = primeraPelicula["FechaEstreno"] ? primeraPelicula["FechaEstreno"].S : '';
                Sinopsis.innerHTML = primeraPelicula["Sinopsis"] ? primeraPelicula["Sinopsis"].S : '';
            } else {
                // Muestra un mensaje si no hay resultados
                mensajeErrorElemento.innerText = 'No hay resultados para la búsqueda.';
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
    
            // Muestra el mensaje de error en la página web
            mensajeErrorElemento.innerText = 'Falló la API call';
    });
}
     






// function buscarContenido(query) {
//     const apiUrl = 'URL_DE_TU_API_GATEWAY/search_cont'; // Reemplaza con la URL real de tu API Gateway

//     fetch(`${apiUrl}?query=${encodeURIComponent(query)}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log('Resultados de la búsqueda:', data);
//             // Aquí puedes actualizar la interfaz de usuario con los resultados
//         })
//         .catch(error => console.error('Error al buscar:', error));
// }

/*let queryStringPelis = location.search // capturando la query que construyó el usuario cuando buscó una palabra
let OLPelis = new URLSearchParams(queryStringPelis);  // a un objeto literal
let queryPelis = OLPelis.get('buscador'); // capturando el valor de la clave "buscador"
let tipo = OLPelis.get('media');

// queremos a partir de la palabra que capturamos traer todo lo que tiene la api en relacion a eso
if (tipo == "all" || tipo == "movies") {

    let url1 = `https://api.themoviedb.org/3/search/movie?api_key=e88616470bd2ffe2b246bcbf04162b02&query=${queryPelis}`;
    fetch(url1)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            let info = data.results
            let articulosBuscados = ''
            if (info.length == 0) {
                let vacio = document.querySelector('.vacio')
                vacio.innerText = `No hay coincidencias con ${queryPelis}`
            } else {

                for (let i = 0; i < info.length; i++) {
                    if (info[i].poster_path == null) {
                        articulosBuscados +=
                            ` <article class="articulo-peli-resultados">
                <a href="./detailmovie.html?movie_id=${info[i].id}"> 
                <img class="imgpeli-resultados" src="./img/noImage.png" alt="Portada">
                </a>
                <div class="padre-info-resultados">
                <a href="detailmovie.html">
                <h2 class="Titulo-de-peli-resultados">${info[i].title}</h2>
                </a>
                <h3 class="Fecha-estreno-resultados">${info[i].release_date}</h3>
                <p class="sinopsis-resultados">${info[i].overview}</p>
                </div>
                </article>`
                    } else {
                        articulosBuscados +=
                            ` <article class="articulo-peli-resultados">
                    <a href="./detailmovie.html?movie_id=${info[i].id}"> 
                    <img class="imgpeli-resultados" src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}" alt="Portada">
                    </a>
                    <div class="padre-info-resultados">
                    <a href="detailmovie.html">
                    <h2 class="Titulo-de-peli-resultados">${info[i].title}</h2>
                    </a>
                    <h3 class="Fecha-estreno-resultados"> Fecha de estreno: ${info[i].release_date}</h3>
                    <p class="sinopsis-resultados">${info[i].overview}</p>
                    </div>
                    </article>`
                    }
                }
            }


            let capturo = document.querySelector('.padre-de-peli-resultados')
            capturo.innerHTML = articulosBuscados;

            //modifico el h1 segun la palabra que busco el usuario//
            let capturo2 = document.querySelector('h1')
            capturo2.innerText = `Resultados de búsqueda: ${queryPelis}`;

        })


        .catch(function (error) {
            console.log("Error: " + error)
        })

}


window.addEventListener('load', function (e) {
    let gif = document.querySelector(".gif")
    gif.style.display = "none";

}) */
