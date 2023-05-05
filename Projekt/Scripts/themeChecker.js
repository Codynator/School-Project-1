const theme = localStorage.getItem("theme");
if (theme === null) {
    theme = "dark";
    localStorage.setItem("theme", "dark");
} else if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
}