import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

// Registrar un nuevo usuario
const register = (
  email,
  password,
  firstName,
  lastName,
  birthDate,
  shippingAddress
) => {
  return axios.post(API_URL + "register", {
    email,
    password,
    firstName,
    lastName,
    birthDate,
    shippingAddress,
  });
};

// Iniciar sesión
const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      console.log("Login response data:", response.data); // Esto muestra el token
      if (response.data) {
        // Guarda el token directamente en el almacenamiento local
        localStorage.setItem("user", JSON.stringify({ token: response.data }));
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data;
      } else {
        console.warn("Token no encontrado en la respuesta del login");
      }
      return response.data;
    });
};

// Cerrar sesión
const logout = () => {
  localStorage.removeItem("user");
  // Remueve el token de los encabezados de axios
  delete axios.defaults.headers.common["Authorization"];
};

// Obtener el usuario actualmente autenticado
const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token ? user : null; // Verifica si existe el token
};

// Interceptor para agregar el token en cada solicitud si está disponible
axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
      console.log("si entra");
    } else {
      console.warn("No se encontró el token en localStorage");
    }
    console.log("User:", user); // log
    console.log("Headers:", config.headers); // log
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
