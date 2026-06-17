// Manejo del menú lateral y de los submenús en la interfaz.
// Se asegura que los botones no actúen como submit y que el submenu se abra cierre sin recargar cada uno de ellos...

const initSidebar = () => {
    const dropdowns = document.querySelectorAll(".dropdown-btn");
    const submenus = document.querySelectorAll(".submenu");
    const submenuLinks = document.querySelectorAll(".submenu a");

    dropdowns.forEach(button => {
        button.type = "button";

        button.addEventListener("click", event => {
            event.preventDefault();

            const submenu = button.nextElementSibling;
            const isVisible = window.getComputedStyle(submenu).display === "block";

            submenus.forEach(menu => {
                if (menu !== submenu) {
                    menu.style.display = "none";
                }
            });

            submenu.style.display = isVisible ? "none" : "block";
        });
    });

    submenuLinks.forEach(link => {
        link.addEventListener("click", () => {
            submenus.forEach(menu => {
                menu.style.display = "none";
            });
        });
    });
};

document.addEventListener("DOMContentLoaded", initSidebar);

                                                                     
    