let queryString = location.search //obtengo la query string desde la url
let queryString2 = new URLSearchParams(queryString) //transformo la query en un objeto literal
let id = queryString2.get('movie_id'); // obtengo el dato del id del objeto literal
console.log(id)

let url = `https://api.themoviedb.org/3/movie/${id}?api_key=63cdfcbb1edb0e2c2331f8b2cb24ba9b`



fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let imagen = document.querySelector(".imagen");
        let titulo = document.querySelector(".titulo");
        let rating = document.querySelector(".rating");
        let fecha = document.querySelector(".fecha");
        let duracion = document.querySelector(".duracion");
        let sinopsis = document.querySelector(".sinopsis");

        if (data.poster_path == null) {
            imagen.src = "./img/noImage.png"
        } else {
            imagen.src = `https://image.tmdb.org/t/p/w342${data.poster_path}`;
        }
        titulo.innerHTML += data.title;
        rating.innerHTML += data.vote_average;
        fecha.innerHTML += data.release_date;
        duracion.innerHTML += data.runtime;
        sinopsis.innerHTML += data.overview;
        let generos = ""
        let info = data
        let capturo = document.querySelector(".generos")

        if (info.genres == null || info.genres == 0) {
            generos += `<p> No se encontraron generos </p>`
        }


        for (let i = 0; i < info.genres.length; i++) {
            generos +=
                `<p><a href="./detail-genres.html?id_G_Movie=${info.genres[i].id}&name_G_Movie=${info.genres[i].name}&tipo=movies">${info.genres[i].name}.  </a></p>`
        }
        capturo.innerHTML += generos;



    })
    .catch(function (error) {
        console.log(error);
    })








