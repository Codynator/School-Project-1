import premiers from "./data/premiers.json" assert { type: "json"};
import movies from "./data/movies.json" assert { type: "json"};
const centerContent = document.getElementById("center-content");
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const moviesContainer = document.getElementById("movies-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const parPageNumber = document.getElementById("par-page-number");
let moviePages = [];
const pages = Math.ceil(movies.length / 8);


function getMovies() {
    moviePages = [];

    // Do każdej strony jest dodawane po 8 filmów.
    let counter = 0;
    for (let i = 0; i < pages; i++) {
        moviePages.push([]);
        for (let x = counter; x < counter + 8; x++) {
            if (movies[x] !== undefined) {
                moviePages[i].push(movies[x]);
            } else {
                break;
            }

        }
        counter += 8;
    }
    console.log(moviePages);
}


function showMovies() {
    const page = parseInt(parPageNumber.innerHTML);
    moviesContainer.innerHTML = "";
    for (const movie of moviePages[page]) {
        moviesContainer.innerHTML += `
        <div class="movie">
            <h3>${movie.title}</h3>
        </div>
        `;
    }
}


function changePage(direction) {
    let page = parseInt(parPageNumber.innerHTML);
    if (page <= 0 && direction === "down") {
        page = 0;
    } else if (page >= pages - 1 && direction === "up") {
        page = page;
    } else {
        if (direction === "up") {
            page++;
        } else {
            page--;
        }
    }
    parPageNumber.innerHTML = page;
    showMovies();
}


function showDescription(event) {
    if (event.target.className !== "movie") {
        return;
    }
    const allMovies = movies.concat(premiers);
    const findMovie = event.target.innerText;
    for (const movie of allMovies) {
        if (movie.title === findMovie) {
            document.getElementById("movie-title").innerText = movie.title;
            document.getElementById("movie-desc").innerText = movie.description;
            centerContent.style.visibility = "visible";
            return;
        }
    }
}


function closeDescription(event) {
    if (centerContent.style.visibility !== "hidden" && event.key === "Escape") {
        centerContent.style.visibility = "hidden";
    } else if (centerContent.style.visibility !== "hidden" && event.target.id === "center-content") {
        centerContent.style.visibility = "hidden";
    }
}


getMovies();
showMovies();
btnPrev.addEventListener("click", () => { changePage("down") });
btnNext.addEventListener("click", () => { changePage("up") });
moviesContainer.addEventListener("click", showDescription);
document.addEventListener("keydown", closeDescription);
document.addEventListener("click", closeDescription);