// Usuwa ekran ładowania
function loadPage() {
    const loader = document.getElementById("loader");
    loader.style.display = "none";
}


window.addEventListener("load", () => { setTimeout(loadPage, 1200) });
