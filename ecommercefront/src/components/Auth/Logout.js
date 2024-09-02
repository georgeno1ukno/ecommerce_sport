import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();
    navigate("/login"); // Redirige al login después de hacer logout
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
