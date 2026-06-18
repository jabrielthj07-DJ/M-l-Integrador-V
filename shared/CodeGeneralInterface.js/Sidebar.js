
// Solo permite un submenú abierto a la vez

const initSidebar = () => {

    const dropdowns =
    document.querySelectorAll(".dropdown-btn");

    const submenus =
    document.querySelectorAll(".submenu");

    dropdowns.forEach(button => {

        button.type = "button";

        button.addEventListener("click", event => {

            event.preventDefault();

            const submenu =
            button.nextElementSibling;

            const estabaAbierto =
            submenu.style.display === "block";

            // Cierra todos los submenús
            submenus.forEach(menu => {

                menu.style.display =
                "none";

            });

            if (!estabaAbierto) {

                submenu.style.display =
                "block";

            }

        });

    });

};

document.addEventListener(
    "DOMContentLoaded",
    initSidebar
);