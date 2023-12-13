const apiGatewayUrl = 'https://1kpho6lka1.execute-api.us-east-1.amazonaws.com/dev/myresource';

const mensajeErrorElemento = document.querySelector('.mensaje-error');

function realizarBusqueda() {
    console.log('Entrando en realizarBusqueda');
    const queryStringPelis = location.search // capturando la query que construyó el usuario cuando buscó una palabra
    console.log('Buscaste:', queryStringPelis);
    const OLPelis = new URLSearchParams(queryStringPelis);  // a un objeto literal
    console.log('Convierto a:', OLPelis);
    const queryPelis = OLPelis.get('buscador'); // capturando el valor de la clave "buscador"
    console.log('Me queda:', queryPelis);

    // Parámetros de búsqueda
    const buscador = queryPelis;
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
        
        if(data.html.length == 1){
         // Accede a los valores específicos de la respuesta JSON
         const posterPath = data.html[0]["Poster Path"].S;
         const titulo = data.html[0].Nombre.S;
         const sinopsis = data.html[0].Sinopsis.S;
         const Provider = data.html[0].Provider.S;
 
         // Asigna los valores a los elementos HTML
         let imagen = document.querySelector(".imagen");
         let tituloElemento = document.querySelector(".titulo");
         let sinopsisElemento = document.querySelector(".sinopsis");
         let ProviderElemento = document.querySelector(".Provider");
 
         // Asigna los valores a los elementos HTML
         imagen.src = posterPath;
         tituloElemento.innerHTML = titulo;
         sinopsisElemento.innerHTML = sinopsis;
         ProviderElemento.innerHTML = `<br><br>Lo puedes ver en: <a href="https://www.${Provider}.com" target="">${Provider}</a>`;
        }
        if(data.html.length == 0){
         let imagen = document.querySelector(".imagen");
         let tituloElemento = document.querySelector(".titulo");
         let sinopsisElemento = document.querySelector(".sinopsis");
         imagen.src = './img/lupa.jpg';
         tituloElemento.innerHTML = 'No se encontró ninguna pelicula';
         sinopsisElemento.innerHTML = 'Prueba con otra';
        }
        if(data.html.length > 1){
            const resultadosContainer = document.querySelector('.main-detailmovie .section-detailmovie');
            resultadosContainer.innerHTML = '';
            data.html.forEach(pelicula => {
                // Crea un contenedor para cada película
                let peliculaContainer = document.createElement('div');
                peliculaContainer.classList.add('pelicula-container');
        
                // Accede a los valores específicos de la respuesta JSON
                const posterPath = pelicula['Poster Path'].S;
                const titulo = pelicula.Nombre.S;
                const sinopsis = pelicula.Sinopsis.S;
                const Provider = pelicula.Provider.S;
        
                // Crea elementos HTML para la película
                let imagen = document.createElement('img');
                imagen.src = posterPath;
        
                let tituloElemento = document.createElement('h2');
                tituloElemento.textContent = titulo;
        
                let sinopsisElemento = document.createElement('p');
                sinopsisElemento.textContent = sinopsis;

                let ProviderElemento = document.createElement('p');
                ProviderElemento.textContent = Provider;
        
                // Agrega los elementos al contenedor de la película
                peliculaContainer.appendChild(imagen);
                peliculaContainer.appendChild(tituloElemento);
                peliculaContainer.appendChild(sinopsisElemento);
                peliculaContainer.appendChild(ProviderElemento);

        
                // Agrega el contenedor de la película al contenedor principal
                resultadosContainer.appendChild(peliculaContainer);
            });}



    })
    .catch(function (error) {
        console.log(error);
    })
}

//buscadorInput.addEventListener('input', realizarBusqueda);
document.addEventListener('DOMContentLoaded', realizarBusqueda());