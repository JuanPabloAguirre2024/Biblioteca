// Simulación de usuario (en producción esto se valida en el servidor)
const usuarioValido = {
    username: "admin",
    password: "1234"
  };
  
  function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === usuarioValido.username && password === usuarioValido.password) {
      localStorage.setItem("usuarioLogueado", username);
      mostrarBienvenida();
    } else {
      alert("Credenciales incorrectas");
    }
  }
  
  function logout() {
    localStorage.removeItem("usuarioLogueado");
    mostrarFormularioLogin();
  }
  
  function mostrarBienvenida() {
    const username = localStorage.getItem("usuarioLogueado");
    if (username) {
      document.getElementById("login-form").style.display = "none";
      document.getElementById("welcome").style.display = "block";
      document.getElementById("welcome-message").textContent = `¡Bienvenido, ${username}!`;
    }
  }
  
  function mostrarFormularioLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("welcome").style.display = "none";
  }
  
  // Verificar si ya hay un usuario logueado al cargar la página
  window.onload = function () {
    if (localStorage.getItem("usuarioLogueado")) {
      mostrarBienvenida();
    } else {
      mostrarFormularioLogin();
    }
  };
  