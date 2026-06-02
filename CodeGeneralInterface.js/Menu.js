// Código para el menú lateral se cierre o oculte al tocarlo
const btnMenu = document.getElementById("btnMenu");

const sidebar = document.querySelector(".sidebar");

btnMenu.addEventListener("click", ()=>{

    sidebar.classList.toggle("oculto");

});