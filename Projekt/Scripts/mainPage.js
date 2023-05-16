import premiers from "./data/premiers.json" assert { type: "json"};
import movies from "./data/movies.json" assert { type: "json"};
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
            ${movie.title}
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


getMovies();
showMovies();
btnPrev.addEventListener("click", () => {changePage("down")});
btnNext.addEventListener("click", () => {changePage("up")});