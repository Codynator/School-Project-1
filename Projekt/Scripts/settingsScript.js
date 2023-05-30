// function showAccountData() {
//     console.log("Działa");
// }


let currentUserJSON = localStorage.getItem("currentUser");
let currentUser = {};
// if (currentUserJSON === null) {
//     location.assign("./loginPage.html");
// } else {
//     currentUser = JSON.parse(currentUserJSON);
//     console.log(currentUser);
// }
const accountContainer = document.getElementById("account-container");