function showAccountData() {
    password = "";
    for (let i = 0; i < currentUser.password.length; i++) {
        password += "*";
    }
    account.innerHTML = `
    <h2><span class="material-symbols-outlined">badge</span>Twoje konto</h2>
    <p>Nazwa użytkownika:<br> <b>${currentUser.nickname}</b></p>
    <p>Email:<br> <b>${currentUser.email}</b></p>
    <p id="password-par">Hasło:<br> <b>${password}</b></p>
    `;
}


function showPassword() {
    const passwordPar = document.getElementById("password-par");
    for (let i = 0; i < password.length; i++) {
        if (!password[i].includes("*")) {
            break;
        } else if (i + 1 === password.length) {
            password = currentUser.password;
            passwordPar.innerHTML = `Hasło:<br> <b>${password}</b>`;
            return;
        }
    }
    password = "";
    for (let i = 0; i < currentUser.password.length; i++) {
        password += "*";
    }
    passwordPar.innerHTML = `Hasło:<br> <b>${password}</b>`;
}


function changeNick() {
    inputContainer.style.display = "flex";
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "zmień nazwę użykownika");
    let newNick;
    btn.addEventListener("click", () => {
        newNick = input.value.trim();
        updateData("changeNick", newNick);
        showAccountData();
        inputContainer.style.display = "none";
        return;
    });
}


function changeEmail() {
    inputContainer.style.display = "flex";
    input.setAttribute("type", "email");
    input.setAttribute("placeholder", "zmień adres email");
    let newEmail;
    btn.addEventListener("click", () => {
        newEmail = input.value.trim();
        updateData("changeEmail", newEmail);
        showAccountData();
        inputContainer.style.display = "none";
        return;
    });
}


function removeAccount() {
    updateData("removeUser");
}


function updateData(action, data = "") {
    const users = JSON.parse(localStorage.getItem("users"));
    let userIndex;
    for (const [index, user] of users.entries()) {
        if (user.nickname === currentUser.nickname) {
            userIndex = index;
            break;
        } else if (index + 1 === users.length) {
            return;
        }
    }
    
    if (action === "changeNick") {
        currentUser.nickname = data;
        users[userIndex].nickname = data;
    } else if (action === "changeEmail") {
        currentUser.email = data;
        users[userIndex].email = data;
    } else if (action === "removeUser") {
        localStorage.removeItem("currentUser");
        users.splice(userIndex);
        console.log(users);
    }

    if (action !== "removeUser") {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
        location.assign("./homePage.html");
    }
    localStorage.setItem("users", JSON.stringify(users));
}


function showOrders() {
    const ordersJSON = localStorage.getItem("orders");
    if (ordersJSON === null) {
        return;
    }
    const foundOrders = [];
    const orders = JSON.parse(ordersJSON);
    for (const order of orders) {
        if (order.nickname === currentUser.nickname) {
            foundOrders.push(order);
        }
    }
    
    for (const order of foundOrders) {
        const newDiv = document.createElement("div");
        newDiv.className = "order";
        newDiv.innerHTML = `
        <p>Film: <b>${order.movie}</b></p>
        <p>Normalne bilety: <b>${order.normalTics}</b></p>
        <p>Ulgowe bilety: <b>${order.reducedTics}</b></p>
        <p>Cena: <b>${order.price} zł</b></p>
        `;
        ordersContainer.appendChild(newDiv);
    }
}

const currentUserJSON = localStorage.getItem("currentUser");
if (currentUserJSON === null) {
    location.assign("./loginPage.html");
} else {
    currentUser = JSON.parse(currentUserJSON);
}
let password = "";
const btnContainer = document.getElementById("btn-container");
const account = document.getElementById("account");
const buttons = btnContainer.querySelectorAll("button");
const ordersContainer = document.getElementById("orders-container");
const inputContainer = document.getElementById("input-container");
const h3 = inputContainer.querySelector("h3");
const input = inputContainer.querySelector("input");
const btn = inputContainer.querySelector("button");

showAccountData();
showOrders();
buttons[0].addEventListener('click', showPassword);
buttons[1].addEventListener("click", changeNick);
buttons[2].addEventListener("click", changeEmail);
buttons[3].addEventListener("click", removeAccount);
inputContainer.addEventListener("click", (event) => {
    if (event.target.id === "input-container") {
        inputContainer.style.display = "none";
    }
});