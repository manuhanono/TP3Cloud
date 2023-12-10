//DETAIL GENERO DE PELICULAS//

//usar location.search para obtener y almacenar la query string
let qs = location.search;

//transformar la qs en objeto literal

let ol = new URLSearchParams(qs);

//obtener valor de id de la query string//
let id = ol.get('id_G_Movie');

//armar un fetch //
let url = `https://api.themoviedb.org/3/discover/movie?api_key=e88616470bd2ffe2b246bcbf04162b02&with_genres=${id}`;

fetch(url)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        console.log(data);

        let info = data.results

        //capturo el DOM//
        let capturo = document.querySelector('.div-detailgeners')

        //variable vacia para luego insertar los articulos//
        let articulosMovies = ''

        for (let i = 0; i < info.length; i++) {
            if (info[i].poster_path == null) {
                articulosMovies +=
                    `<article class="article-detailgeners">
     <h4>${info[i].original_title}</h4>
     <a href="./detailmovie.html?movie_id=${info[i].id}"> <img src="./img/noImage.png" alt="Portada">
     </a></article>`
            } else {
                articulosMovies +=
                    `<article class="article-detailgeners">
             <h4>${info[i].original_title}</h4>
             <a href="./detailmovie.html?movie_id=${info[i].id}"> <img src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}" alt="Portada">
             </a></article>`
            }
        }

        //modifico el DOM//
        capturo.innerHTML = articulosMovies;
    })

    .catch(function (error) {
        console.log("Error: " + error)
    })


