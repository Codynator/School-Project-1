function checkData(event) {
    event.preventDefault();
    const h1 = container.querySelector("h1");

    if (h1.innerHTML === "Zaloguj się") {
        login()
    } else {
        register();
    }
}


function checkStatus() {
    const h1 = container.querySelector("h1");

    if (h1.innerHTML === "Zaloguj się") {
        h1.innerHTML = "Zarejestruj się";
        loginForm.submitButton.innerHTML = "Zarejestruj się";
        par1.innerHTML = "Wróć do logowania";
        loginForm.confirmInput.style.display = "block";
    } else {
        h1.innerHTML = "Zaloguj się";
        loginForm.submitButton.innerHTML = "Zaloguj się";
        par1.innerHTML = "Nie masz konta? Zarejestruj się!"
        loginForm.confirmInput.style.display = "none";
    }
}


function login() {
    console.log("Działa");
}


function register() {
    const nickname = loginForm.nickInput.value.trim();
    const email = loginForm.emailInput.value.trim();
    const password = loginForm.passwordInput.value.trim();
    const confPassword = loginForm.confirmInput.value.trim();

    if (nickname.length === 0) {
        par2.innerHTML = "Podaj pseudonim";
        return;
    } else if (email.length === 0) {
        par2.innerHTML = "Podaj email";
        return;
    } else if (password.length === 0) {
        par2.innerHTML = "Podaj hasło";
        return;
    } else if (confPassword.length === 0) {
        par2.innerHTML = "Powtórz hasło";
        return;
    } else if (password !== confPassword) {
        par2.innerHTML = "Powtórz ponownie hasło";
        return;
    } else {
        par2.innerHTML = "";
    }

    const newUser = {nickname: nickname, email: email, password: password};
    users.push(newUser);
    usersJSON = JSON.stringify(users);
    localStorage.setItem("users", usersJSON);
    console.log(users);
}


const btnBack = document.getElementById("back-btn");
const container = document.getElementById("container");
const loginForm = document.getElementById("login-form");
const par1 = document.getElementById("par-1");
const par2 = document.getElementById("par-2");


let users = [
    {nickname: "admin", email: "admin@gmail.com", password: "12345"}
];
let usersJSON = localStorage.getItem("users");

if (usersJSON === null) {
    console.log("Eksport użytkowników...")
    usersJSON = JSON.stringify(users);
    localStorage.setItem("users", usersJSON);
} else {
    console.log("Import użytkowników...");
    users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
}


btnBack.addEventListener("click", () => {history.back()});
loginForm.addEventListener("submit", checkData);
par1.addEventListener("click", checkStatus);