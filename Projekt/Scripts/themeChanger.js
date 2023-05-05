function changeTheme() {
    if (theme === "dark") {
        btnTheme.innerHTML = `<span class="material-symbols-outlined">toggle_on</span>`;
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        theme = "light";
    } else {
        btnTheme.innerHTML = `<span class="material-symbols-outlined">toggle_off</span>`;
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        theme = "dark";
    }
}

const btnTheme = document.getElementById("btn-theme");
let theme = localStorage.getItem("theme");

if (theme === null) {
    theme = "dark";
    localStorage.setItem("theme", "dark");
} else if (theme === "light") {
    btnTheme.innerHTML = `<span class="material-symbols-outlined">toggle_on</span>`;
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
}

btnTheme.addEventListener("click", changeTheme);
