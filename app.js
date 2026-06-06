const btn = document.querySelector("#search-btn");
const input = document.querySelector("#search-input");
const movieContainer = document.querySelector("#movie-cards");


// let movie = {
//     title: "Interstellar",
//     year: "2014",
//     ratings: 8.7,
//     poster: "images/img.jpg"
// };


btn.addEventListener("click", async () => {


    console.log("btn clicked");
    if (input.value.trim() === "") {
        alert("Enter movie name");
    } else {
        console.log(`Searching for: ${input.value}`);
    }

   let movie = await getMovie(input.value);
    
    let movieCard = document.createElement("div");
    let poster = document.createElement("img");
    let title = document.createElement("h3");
    let releaseYear = document.createElement("p");
    let rating = document.createElement("p");


    poster.src = movie.Poster;
    title.innerText = movie.Title;
    releaseYear.innerText = movie.Year;
    rating.innerText = `IMDb : ${movie.imdbRating}`;
    movieCard.setAttribute("class", "movie-card");

    movieContainer.appendChild(movieCard);
    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieCard.appendChild(releaseYear);
    movieCard.appendChild(rating);


});

   
  async function getMovie(movieName) {
   let url = `https://www.omdbapi.com/?apikey=4c3cd847&t=${movieName}`;
    try{
        let response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (e){
        console.log("Invalid Request ",e);
    }

}