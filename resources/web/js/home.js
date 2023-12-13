// Función para cargar las opciones de películas
let primeraPelicula, segundaPelicula;

function cargarOpcionesPeliculas() {
    // Realizar la API call para obtener la lista de películas desde tu API Gateway
    const apiUrl = 'https://6lbqfzpzp8.execute-api.us-east-1.amazonaws.com/dev/myresource';
  
    // Realizar la solicitud utilizando Fetch API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Verificar que haya al menos dos películas en la lista
        if (data.peliculas.length < 2) {
          console.error('No hay suficientes películas en la lista.');
          return;
        }
  
              // Obtener índices aleatorios
        const indicePelicula1 = Math.floor(Math.random() * data.peliculas.length);
        let indicePelicula2;
        do {
            indicePelicula2 = Math.floor(Math.random() * data.peliculas.length);
        } while (indicePelicula2 === indicePelicula1); // Asegurarse de que sean índices diferentes

        // Obtener las películas correspondientes a los índices aleatorios
        pelicula1 = data.peliculas[indicePelicula1];
        pelicula2 = data.peliculas[indicePelicula2];
  
        // Guardar las películas en variables (puedes ajustar esto según tus necesidades)
        const primeraPelicula = pelicula1;
        const segundaPelicula = pelicula2;
  
        // Puedes hacer lo que quieras con las variables aquí
        console.log('Primera Película:', primeraPelicula);
        console.log('Segunda Película:', segundaPelicula);
        realizarBusqueda(primeraPelicula);
        realizarBusqueda2(segundaPelicula);
      })
      .catch(error => console.error('Error al cargar opciones de películas:', error));
  }
  
  // Llama a la función para cargar las opciones al cargar la página
  window.addEventListener('load', cargarOpcionesPeliculas);

function realizarBusqueda(peli) {
        console.log('Entrando en realizarBusqueda');
        const apiGatewayUrl = 'https://1kpho6lka1.execute-api.us-east-1.amazonaws.com/dev/myresource';

        
        // Obtiene el valor del campo de búsqueda
        const valorBuscador = peli;
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
// Definir los valores constantes para buscadorInput


//document.addEventListener('DOMContentLoaded', realizarBusqueda);

function realizarBusqueda2(peli) {
    console.log('Entrando en realizarBusqueda');
    const apiGatewayUrl = 'https://1kpho6lka1.execute-api.us-east-1.amazonaws.com/dev/myresource';

    
    // Obtiene el valor del campo de búsqueda
    const valorBuscador = peli;
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
         let imagen = document.querySelector(".imagen2");
         let tituloElemento = document.querySelector(".titulo2");
         let sinopsisElemento = document.querySelector(".sinopsis2");
 
         // Asigna los valores a los elementos HTML
         imagen.src = posterPath;
         tituloElemento.innerHTML = titulo;
         sinopsisElemento.innerHTML = sinopsis;

    })
    .catch(function (error) {
        console.log(error);
    })
}
// Definir los valores constantes para buscadorInput


//document.addEventListener('DOMContentLoaded', realizarBusqueda2);


  