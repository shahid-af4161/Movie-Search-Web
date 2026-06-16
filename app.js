const btn = document.querySelector("#search-btn");
const input = document.querySelector("#search-input");
const movieContainer = document.querySelector("#movie-cards");
const featuredContainer = document.querySelector("#featured-movies")
const movieDetails = document.querySelector("#movie-details");


// let movie = {
//     title: "Interstellar",
//     year: "2014",
//     ratings: 8.7,
//     poster: "images/img.jpg"
// };

const featuredMovie = [
    "Interstellar", 
    "The Godfather", 
    "Gladiator", 
    "WALL·E", 
    "Avengers: Endgame"
];

async function loadFeaturedMovies() {
    for(let movie of featuredMovie){
      let url = `https://www.omdbapi.com/?apikey=4c3cd847&t=${movie}`;
      try{
            // let response = await axios.get(url);
            // console.log(response);
            // let featMovie = response.data;
            // 
            // console.log(response);
            let featMovie = await getMovie(movie);
            console.log(featMovie);
            createMovieCard(featMovie.Search[0],featuredContainer);
      } catch(e){
        console.log("Couldn't find featured Movie:",e);
      }
    }
    
}



btn.addEventListener("click", searchMovie);

input.addEventListener("keydown", (event) => {
    //    console.log(event.key);
    if (event.key == 'Enter') {
        searchMovie();
    }
});



async function searchMovie() {
    movieContainer.innerHTML = "";

    if (input.value.trim() === "") {
        alert("Enter movie name");
        return;
    } else {
        console.log(`Searching for: ${input.value}`);
    }

    let movieFetch = await getMovie(input.value);  // object that has movie list in array(Search)
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
        createMovieCard(movie,movieContainer);
    });

    
}


function createMovieCard(movie,Container) {
    let movieCard = document.createElement("div");
    let poster = document.createElement("img");
    let title = document.createElement("h3");
    let releaseYear = document.createElement("p");
    let type = document.createElement("p");
    let rating = document.createElement("p");


   
    if(movie.Poster === "N/A"){
         poster.src = "images/Poster-NA.png";
    } else{
           poster.src = movie.Poster;
    }
    title.innerText = movie.Title;
    releaseYear.innerText = movie.Year;
    type.innerText = `Type : ${movie.Type}`;
    rating.innerText = `IMDb : ${movie.imdbID}`;
    movieCard.setAttribute("class", "movie-card");

    Container.appendChild(movieCard);
    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieCard.appendChild(releaseYear);
    movieCard.appendChild(type);
    // movieCard.appendChild(rating);

    movieCard.addEventListener("click",async ()=>{
    let details = await getMovieDetails(movie.imdbID); // detailed object
    // console.log(details);
    movieDetails.innerHTML = `
    <img src="${details.Poster}" alt="${details.Title}">
    <div class="movie-info">
        <h2>${details.Title}</h2>

        <p><strong>IMDb:</strong> ${details.imdbRating}</p>
        <p><strong>Genre:</strong> ${details.Genre}</p>
        <p><strong>Director:</strong> ${details.Director}</p>
        <p><strong>Actors:</strong> ${details.Actors}</p>
        <p><strong>Box Office:</strong> ${details.BoxOffice}</p>

        <p class="plot">
            <strong>Plot:</strong> ${details.Plot}
        </p>
        <p><strong>Awards :</strong> ${details.Awards}</p>
    </div>
                             `;
    movieDetails.scrollIntoView({
        behavior: "smooth"
    })
    });
}


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

async function getMovieDetails(imdbID) {
    try{
    let url = `https://www.omdbapi.com/?apikey=4c3cd847&i=${imdbID}`
    let response = await axios.get(url);
    console.log(response.data);
    return response.data;
    
    } catch(error){
        console.log("Details not found.", error);
    }

}
loadFeaturedMovies();