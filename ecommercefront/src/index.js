import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Importamos estilos globales si los tienes
import App from "./App"; // Importamos el componente principal de la aplicación

// Renderizamos el componente App
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
