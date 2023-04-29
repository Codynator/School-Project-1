const btnLogin = document.getElementById("btn-login");
const toggle = document.getElementById("btn-menu");
const menu = document.getElementById("menu");
const divMenu = document.getElementById("div-menu");


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
    if (btnLogin.innerHTML == '<span class="material-symbols-outlined">login</span>Zaloguj się') {
        btnLogin.innerHTML = '<span class="material-symbols-outlined">account_circle</span>';
    } else {
        // btnLogin.innerHTML = '<span class="material-symbols-outlined">login</span>Zaloguj się';
        return;
    }
}


btnLogin.addEventListener("click", login);
toggle.addEventListener("click", showMenu);
window.addEventListener("load", () => { setTimeout(loadPage, 1200) });
