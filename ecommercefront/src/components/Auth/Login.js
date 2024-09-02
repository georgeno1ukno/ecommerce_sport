// Importamos las bibliotecas necesarias y el servicio de autenticación
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Login = () => {
  // Definimos el estado local para almacenar los datos de entrada del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useNavigate es usado para redirigir al usuario después del inicio de sesión
  const navigate = useNavigate();

  // Función que se ejecuta cuando el usuario envía el formulario de inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Intentamos autenticar al usuario con el servicio de autenticación
      await authService.login(email, password);
      // Si el inicio de sesión es exitoso, redirigimos al usuario a la página principal
      navigate("/");
    } catch (error) {
      // Si hay un error, mostramos un mensaje al usuario
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
