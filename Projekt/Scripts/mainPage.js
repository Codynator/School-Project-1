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
const btnBuy = document.getElementById("btn-buy");
const movieSelect = document.getElementById("movie-select");
const hotbar = document.getElementById("hotbar");
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
}


function showMovies() {
    const page = parseInt(parPageNumber.innerHTML);
    moviesContainer.style.display = "grid";
    pageControl.style.display = "flex";
    ticketsContainer.style.display = "none";

    if (page > moviePages.length) { return; }
    moviesContainer.innerHTML = "";
    for (const movie of moviePages[page - 1]) {
        moviesContainer.innerHTML += `
        <div class="movie" style="background-image: url(${movie.image});">
            <h3>${movie.title}</h3>
        </div>
        `;
    }
}


function changePage(direction) {
    let page = parseInt(parPageNumber.innerHTML);
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
    const moviePoster = document.getElementById("movie-poster");
    moviePoster.innerHTML = "";
    const allMovies = movies.concat(premiers);
    const findMovie = event.target.innerText;
    for (const movie of allMovies) {
        if (movie.title === findMovie) {
            const poster = document.createElement("img");
            poster.setAttribute("src", movie.image);
            moviePoster.appendChild(poster);
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
    ticketsContainer.style.display = "grid";

    const premiersGroup = document.createElement("optgroup");
    premiersGroup.setAttribute("label", "Premiery");
    const movieGroup = document.createElement("optgroup");
    movieGroup.setAttribute("label", "Filmy");

    for (const premiere of premiers) {
        premiersGroup.innerHTML += `<option value="${premiere.title}">${premiere.title}</option>`;
    }
    for (const movie of movies) {
        movieGroup.innerHTML += `<option value="${movie.title}">${movie.title}</option>`;
    }
    movieSelect.appendChild(premiersGroup);
    movieSelect.appendChild(movieGroup);
}


function getTickets() {
    const normalTicsInput = ticketsContainer.querySelector("#normal-tickets");
    const reducedTicsInput = ticketsContainer.querySelector("#reduced-tickets");
    const normalTics = Number(normalTicsInput.value);
    const reducedTics = Number(reducedTicsInput.value);

    if (normalTics < 0) {
        showError(normalTicsInput);
        return;
    } else if (reducedTics < 0) {
        showError(reducedTicsInput);
        return;
    } else if (normalTics === 0 && reducedTics === 0) {
        showError(normalTicsInput);
        showError(reducedTicsInput);
        return;
    } else if (localStorage.getItem("currentUser") === null) {
        btnBuy.toggleAttribute("disabled");
        btnBuy.style.borderColor = "red";
        btnBuy.innerHTML = "Zaloguj się abu kupić bilety!";
        setTimeout(() => {
            btnBuy.toggleAttribute("disabled");
            btnBuy.style.borderColor = "orange";
            btnBuy.innerHTML = "Kupuję";
        }, 3000)
        return;
    }

    const newOrder = {
        nickname: JSON.parse(localStorage.getItem("currentUser")).nickname,
        movie: movieSelect.value,
        normalTics: normalTics,
        reducedTics: reducedTics,
        price: 20 * normalTics + 13 * reducedTics
    };
    btnBuy.innerHTML = "Zakup udany!";
    btnBuy.style.borderColor = "green";
    setTimeout(() => {
        btnBuy.style.borderColor = "orange";
        btnBuy.innerHTML = "Kupuję";
    }, 3000);
    
    orders.push(newOrder);
    ordersJSON = JSON.stringify(orders);
    localStorage.setItem("orders", ordersJSON);
}


function showError(inputName) {
    inputName.style.borderColor = "red";
    inputName.setAttribute("type", "text");
    inputName.toggleAttribute("disabled");
    inputName.value = "Niepoprawna liczba biletów";
    setTimeout(() => {
        inputName.style.borderColor = "orange";
        inputName.setAttribute("type", "number");
        inputName.toggleAttribute("disabled");
        inputName.value = "";
    }, 3000);
}


function setOutline(event, firstName = false) {
    if (firstName === true) {
        btn3.style.outline = "0.2em solid rgba(255, 166, 0, 0.8)";
        return;
    }
    const buttons = hotbar.querySelectorAll("button");
    const btn = document.getElementById(event.target.id);
    if (event.target.tagName === "DIV") {
        return;
    }
    for (const button of buttons) {
        button.style.outline = "none";
    }
    btn.style.outline = "0.2em solid rgba(255, 166, 0, 0.8)";
}

let orders = [];
let ordersJSON = localStorage.getItem("orders");
if (ordersJSON === null) {
    ordersJSON = JSON.stringify(orders);
    localStorage.setItem("orders", ordersJSON);
} else {
    orders = JSON.parse(localStorage.getItem("orders"));
}

getMovies(movies);
showMovies();
setOutline(null, true);
btnPrev.addEventListener("click", () => { changePage("down") });
btnNext.addEventListener("click", () => { changePage("up") });
moviesContainer.addEventListener("click", showDescription);
document.addEventListener("keydown", closeDescription);
document.addEventListener("click", closeDescription);
btn3.addEventListener("click", () => { getMovies(movies); showMovies();});
btn2.addEventListener("click", showTickets);
btn1.addEventListener("click", () => { getMovies(premiers); showMovies();});
hotbar.addEventListener("click", setOutline);
btnBuy.addEventListener("click", getTickets);