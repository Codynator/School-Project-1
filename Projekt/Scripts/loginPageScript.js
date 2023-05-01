// Sprawdzanie, czy jest możliwość logowania lub rejetracji.
function checkData(event) {
    event.preventDefault();
    const h1 = container.querySelector("h1");

    if (h1.innerHTML === "Zaloguj się") {
        login()
    } else {
        register();
    }
}


// Przełączanie między logowaniem a rejestrowaniem się.
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


// Logowanie. Pobiera dane, sprawdza wszystko po kolei i loguje.
function login() {
    console.log("Próba logowania...")
    const nickname = loginForm.nickInput.value.trim();
    const email = loginForm.emailInput.value.trim();
    const password = loginForm.passwordInput.value.trim();
    const searchedUser = {nickname: nickname, email: email, password: password};

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

    if (findUser(searchedUser, true)) {
        console.log("Zalogowano!");
        formContainer.style.display = "none";
        loggedContainer.style.display = "flex";
        loggedContainer.querySelector("p").innerHTML = `Witaj <b>${nickname}</b>!`;
    } else {
        showMessage("Niepoprawne dane");
    }
}


// Rejestruje użykownika. Najpierw pobiera dane, tworzy wzór, sprawdza czy istnieje, i go dodaje.
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
    if (findUser(newUser)) {
        showMessage("Użytkownik już istnieje!");
        return;
    }

    users.push(newUser);
    usersJSON = JSON.stringify(users);
    localStorage.setItem("users", usersJSON);
    console.log(users);
    login();
}


// Wyświetlanie chwilowego komunikatu.
function showMessage(msg) {
    par2.innerHTML = msg;
    setTimeout(() => {par2.innerHTML = ""}, 2000);
}


// Szuka, podanego jako parametr, użytkownika i zwraca true, jeśli znalazło.
function findUser(lookFor, createUser = false, removeUser = false) {
    let foundArr = [];

    for (const user of users) {
        if (user.nickname === lookFor.nickname) {
            console.log("Znaleziono nazwę użytkownika!");
            foundArr.push("nickname");
        }
        if (user.email === lookFor.email) {
                console.log("Odnaleziono email!");
                foundArr.push("email");
        }
        if (user.password === lookFor.password) {
            console.log("Odnaleziono hasło!");
            foundArr.push("password");
        }
        if (foundArr.length === 3) {
            if (removeUser) {
                // Usuwanie obiektu użytkownika z listy obiektów
                users.splice(user);
            }
            break;
        } else {
            foundArr = [];
        }
        
    }

    if (foundArr.length === 3) {
        if (createUser) {
            // Dodawanie obiektu obecnego użytkownika
            const currentUser = JSON.stringify(lookFor);
            localStorage.setItem("currentUser", currentUser);
        }
        return true;
    } else {
        return false;
    }
}


// Wylogowywanie użykownika.
function logout() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser === null) {
        return;
    } else {
        localStorage.removeItem("currentUser");
        loggedContainer.style.display = "none";
        formContainer.style.display = "block";
    }
}


// Usuwanie użykownika.
function deleteUser() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser === null) {
        return;
    }

    findUser(currentUser, false, true);
    logout();
}


const btnBack = document.getElementById("back-btn");
const container = document.getElementById("container");
const loginForm = document.getElementById("login-form");
const par1 = document.getElementById("par-1");
const par2 = document.getElementById("par-2");
const formContainer = document.getElementById("formContainer");
const loggedContainer = document.getElementById("loggedContainer");


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
loggedContainer.querySelector("button").addEventListener("click", logout);