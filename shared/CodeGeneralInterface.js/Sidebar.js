// Pa que funcione y se abra un bloque (submenus) pa navegar
const dropdowns = document.querySelectorAll(".dropdown-btn");

dropdowns.forEach(button => {

    button.addEventListener("click", () => {

        const submenu = button.nextElementSibling;

        if(submenu.style.display === "block"){
            submenu.style.display = "none";
        }
        else{
            submenu.style.display = "block";
        }
    });
});

