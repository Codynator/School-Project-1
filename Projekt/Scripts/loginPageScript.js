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
    console.log("Próba logowania...")
    const nickname = loginForm.nickInput.value.trim();
    const email = loginForm.emailInput.value.trim();
    const password = loginForm.passwordInput.value.trim();
    const searchedUser = {nickname: nickname, email: email, password: password};
    let foundArr = [];

    if (nickname.length === 0) {
        showMessage("Podaj pseudonim");
        return;
    } else if (email.length === 0) {
        showMessage("Podaj email")
        return;
    } else if (password.length === 0) {
        showMessage("Podaj hasło")
        return;
    }

    for (const user of users) {
        if (user.nickname === searchedUser.nickname) {
            console.log("Znaleziono nazwę użytkownika!");
            foundArr.push("nickname");
        }
        if (user.email === searchedUser.email) {
                console.log("Odnaleziono email!");
                foundArr.push("email");
        }
        if (user.password === searchedUser.password) {
            console.log("Odnaleziono hasło!");
            foundArr.push("password");
        }
        if (foundArr.length === 3) {
            break;
        } else {
            foundArr = [];
        }
        
    }

    if (foundArr.length === 3) {
        currentUser = JSON.stringify(searchedUser);
        localStorage.setItem("currentUser", currentUser);
    } else {
        showMessage("Niepoprawne dane");
    }
}


function register() {
    const nickname = loginForm.nickInput.value.trim();
    const email = loginForm.emailInput.value.trim();
    const password = loginForm.passwordInput.value.trim();
    const confPassword = loginForm.confirmInput.value.trim();

    if (nickname.length === 0) {
        showMessage("Podaj pseudonum");
        return;
    } else if (email.length === 0) {
        showMessage("Podaj email");
        return;
    } else if (password.length === 0) {
        showMessage("Podaj hasło");
        return;
    } else if (confPassword.length === 0) {
        showMessage("Powtórz hasło");
        return;
    } else if (password !== confPassword) {
        showMessage("Powtórz ponownie hasło");
        return;
    }

    const newUser = {nickname: nickname, email: email, password: password};
    users.push(newUser);
    usersJSON = JSON.stringify(users);
    localStorage.setItem("users", usersJSON);
    console.log(users);
}


function showMessage(msg) {
    par2.innerHTML = msg;
    setTimeout(() => {par2.innerHTML = ""}, 2000);
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