function login(goto = true) {
    if (currentUser === null) {
        btnLogin.innerHTML = '<span class="material-symbols-outlined">login</span>Zaloguj się';
        if (goto) {
            location.assign("loginPage.html");
        }
        return;
    } else {
        profile.querySelector("p").innerHTML = `Jesteś zalogowany jako:<br><b>${currentUser.nickname}</b>`;

        btnLogin.innerHTML = '<span class="material-symbols-outlined">account_circle</span>';

        profile.classList.toggle("open");

        // Wyłączanie i włączanie widoczności div-menu
        if (divProfile.style.visibility === "visible") {
            setTimeout(() => { divProfile.style.visibility = "hidden"; }, 300);
        } else {
            divProfile.style.visibility = "visible";
        }
    }
}


function logout() {
    if (currentUser === null) {
        return;
    } else {
        localStorage.removeItem("currentUser");
        
        if (profile.classList.contains("open")) {
            profile.classList.remove("open");
            currentUser = null;
            login(false);
        }
    }
}


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


const toggle = document.getElementById("btn-menu");
const menu = document.getElementById("menu");
const divMenu = document.getElementById("div-menu");

const divProfile = document.getElementById("div-profile");
const profile = document.getElementById("profile");
const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btnLogout");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));


login(false);
btnLogin.addEventListener("click", login);
toggle.addEventListener("click", showMenu);
btnLogout.addEventListener("click", logout);
divProfile.style.visibility = "hidden";
