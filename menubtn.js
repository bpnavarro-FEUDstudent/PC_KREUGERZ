const menuBtn = document.getElementById("menu-btn");
const dropdown = document.getElementById("dropdown-menu");

menuBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
});