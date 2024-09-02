// Importamos las bibliotecas necesarias y el servicio de usuario
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";

const UserEditProfile = () => {
  // Definimos el estado local para almacenar la información editable del usuario
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    shippingAddress: "",
  });

  const navigate = useNavigate(); // Reemplazamos useHistory con useNavigate

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

  // Función para manejar la actualización de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.updateUserProfile(user);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Shipping Address:</label>
          <input
            type="text"
            name="shippingAddress"
            value={user.shippingAddress}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserEditProfile;
