const btn = document.querySelector("#search-btn");
const input = document.querySelector("#search-input");
const movieContainer = document.querySelector("#movie-cards");


// let movie = {
//     title: "Interstellar",
//     year: "2014",
//     ratings: 8.7,
//     poster: "images/img.jpg"
// };

async function searchMovie() {
    movieContainer.innerHTML = "";
    console.log("btn clicked");
    if (input.value.trim() === "") {
        alert("Enter movie name");
        return;
    } else {
        console.log(`Searching for: ${input.value}`);
    }

    let movieFetch = await getMovie(input.value);
    console.log(movieFetch);
    if (movieFetch.Response === 'False') {
        movieContainer.innerHTML = `<h3>${movieFetch.Error}</h3>`;
        // console.log(movieFetch);
        return;
    }
     
    let movieList = movieFetch.Search;
    console.log(movieList);
    movieList.forEach(movie => {
        // console.log(movie);
        createMovieCard(movie);
    });

}
function createMovieCard(movie) {
    let movieCard = document.createElement("div");
    let poster = document.createElement("img");
    let title = document.createElement("h3");
    let releaseYear = document.createElement("p");
    let type = document.createElement("p");
    let rating = document.createElement("p");


    poster.src = movie.Poster;
    title.innerText = movie.Title;
    releaseYear.innerText = movie.Year;
    type.innerText = `Type : ${movie.Type}`;
    rating.innerText = `IMDb : ${movie.imdbID}`;
    movieCard.setAttribute("class", "movie-card");

    movieContainer.appendChild(movieCard);
    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieCard.appendChild(releaseYear);
    movieCard.appendChild(type);
    // movieCard.appendChild(rating);

    movieCard.addEventListener("click",()=>{
    console.log(movie.imdbID);
    });
}

btn.addEventListener("click", searchMovie);

input.addEventListener("keydown", (event) => {
    //    console.log(event.key);
    if (event.key == 'Enter') {
        searchMovie();
    }
});






async function getMovie(movieName) {
    let url = `https://www.omdbapi.com/?apikey=4c3cd847&s=${movieName}`;
    try {
        let response = await axios.get(url);
        console.log(response.data.Search); // returns an array
        // response.data.Search.forEach(movie =>{
        //     console.log(movie);
        // })
        return response.data;

    } catch (e) {
        console.log("Invalid Request ", e);
    }
}
