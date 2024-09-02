// Importamos las bibliotecas necesarias y el servicio de usuario
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import userService from "../../services/userService";

const UserProfile = () => {
  // Definimos el estado local para almacenar la información del usuario
  const [user, setUser] = useState(null);

  // useEffect se utiliza para cargar la información del usuario cuando el componente se monta
  useEffect(() => {
    loadUserProfile();
  }, []);

  // Función para cargar la información del usuario desde el servicio
  const loadUserProfile = async () => {
    try {
      const response = await userService.getUserProfile();
      setUser(response.data);
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  };

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Shipping Address: {user.shippingAddress}</p>
      <Link to="/edit-profile">
        <button>Edit Profile</button>
      </Link>
    </div>
  );
};

export default UserProfile;
