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
const pageControl = document.getElementById("page-control");
const ticketsContainer = document.getElementById("tickets-container");
let moviePages = [];
let pages;


function getMovies(moviesArr) {
    moviePages = [];
    pages = Math.ceil(moviesArr.length / 8);

    // Do każdej strony jest dodawane po 8 filmów.
    let counter = 0;
    for (let i = 0; i < pages; i++) {
        moviePages.push([]);
        for (let x = counter; x < counter + 8; x++) {
            if (moviesArr[x] !== undefined) {
                moviePages[i].push(moviesArr[x]);
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
    moviesContainer.style.display = "grid";
    pageControl.style.display = "flex";

    if (page > moviePages.length) { return; }
    moviesContainer.innerHTML = "";
    for (const movie of moviePages[page - 1]) {
        moviesContainer.innerHTML += `
        <div class="movie">
            <h3>${movie.title}</h3>
        </div>
        `;
    }
}


function changePage(direction) {
    let page = parseInt(parPageNumber.innerHTML);
    console.log(page);
    if (page > moviePages.length) {
        page = moviePages.length;
    }

    if (page <= 1 && direction === "down") {
        page = 1;
    } else if (page >= pages && direction === "up") {
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


function showTickets() {
    pageControl.style.display = "none";
    moviesContainer.style.display = "none";
}


getMovies(movies);
showMovies();
btnPrev.addEventListener("click", () => { changePage("down") });
btnNext.addEventListener("click", () => { changePage("up") });
moviesContainer.addEventListener("click", showDescription);
document.addEventListener("keydown", closeDescription);
document.addEventListener("click", closeDescription);
btn3.addEventListener("click", () => { getMovies(movies); showMovies(); });
btn2.addEventListener("click", showTickets);
btn1.addEventListener("click", () => { getMovies(premiers); showMovies(); });