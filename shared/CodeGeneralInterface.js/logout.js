 const logoutButton = document.getElementById("logout");
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("token");   
            const loginUrl = window.location.origin + "/Login/Login.Html";
            window.location.href = loginUrl;
        });