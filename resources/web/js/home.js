function realizarBusqueda() {
        console.log('Entrando en realizarBusqueda');
        const apiGatewayUrl = 'https://1kpho6lka1.execute-api.us-east-1.amazonaws.com/dev/myresource';

        
        // Obtiene el valor del campo de búsqueda
        const valorBuscador = 'Freelance';
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


document.addEventListener('DOMContentLoaded', realizarBusqueda);

function realizarBusqueda2() {
    console.log('Entrando en realizarBusqueda');
    const apiGatewayUrl = 'https://1kpho6lka1.execute-api.us-east-1.amazonaws.com/dev/myresource';

    
    // Obtiene el valor del campo de búsqueda
    const valorBuscador = 'Reign of Chaos';
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


document.addEventListener('DOMContentLoaded', realizarBusqueda2);