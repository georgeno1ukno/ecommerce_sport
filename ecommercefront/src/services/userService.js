import axios from "axios";

const API_URL = "http://localhost:8080/api/users/";

// Función para obtener la información del perfil del usuario
const getUserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  };
  return axios.get(API_URL + "me", config);
};

// Función para actualizar la información del perfil del usuario
const updateUserProfile = (userData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  };
  return axios.put(API_URL + "me", userData, config);
};

export default {
  getUserProfile,
  updateUserProfile,
};
