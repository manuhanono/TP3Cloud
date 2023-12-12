
let queryStringPelis = location.search // capturando la query que construyó el usuario cuando buscó una palabra
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

}) 
