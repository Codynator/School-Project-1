// Otwiera i zamyka menu
function showMenu() {
    menu.classList.toggle("open");
    console.log(divMenu.style.visibility);

    // Wyłączanie i włączanie widoczności div-menu
    if (divMenu.style.visibility === "visible") {
        setTimeout(() => { divMenu.style.visibility = "hidden"; }, 300);
    } else {
        divMenu.style.visibility = "visible";
    }
}


// Usuwa ekran ładowania
function loadPage() {
    const loader = document.getElementById("loader");
    loader.style.display = "none";
}


// ? Będzie odpowiadać za logowanie
function login() {
    if (currentUser === null) {
        location.assign("loginPage.html");
    } else {
        btnLogin.innerHTML = '<span class="material-symbols-outlined">account_circle</span>';
    }
}


const btnLogin = document.getElementById("btn-login");
const toggle = document.getElementById("btn-menu");
const menu = document.getElementById("menu");
const divMenu = document.getElementById("div-menu");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));


btnLogin.addEventListener("click", login);
toggle.addEventListener("click", showMenu);
window.addEventListener("load", () => { setTimeout(loadPage, 1200) });
