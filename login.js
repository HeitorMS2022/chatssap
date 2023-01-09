function login(){
    username = document.getElementById("nome").value;
    localStorage.setItem("nome", username);
    window.location = "inicial.html";
}