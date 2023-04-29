const btnTheme = document.getElementById("btn-theme");


function changeTheme() {
    if (btnTheme.innerHTML === `<span class="material-symbols-outlined">toggle_off</span>`) {
        btnTheme.innerHTML = `<span class="material-symbols-outlined">toggle_on</span>`;
        document.documentElement.setAttribute("data-theme", "light");
    } else {
        btnTheme.innerHTML = `<span class="material-symbols-outlined">toggle_off</span>`;
        document.documentElement.setAttribute("data-theme", "dark");
    }
}


btnTheme.addEventListener("click", changeTheme);
