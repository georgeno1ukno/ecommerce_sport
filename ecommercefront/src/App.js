// Importamos las bibliotecas necesarias para React y React Router
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importamos los componentes que serán renderizados en diferentes rutas
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Cart from "./components/Cart/Cart";
import ItemList from "./components/Items/ItemList";
import ItemDetail from "./components/Items/ItemDetail";
import OrderList from "./components/Orders/OrderList";
import OrderDetail from "./components/Orders/OrderDetail";
import UserProfile from "./components/User/UserProfile";
import UserEditProfile from "./components/User/UserEditProfile";
import NavBar from "./components/NavBar/NavBar"; // Importa el componente NavBar
import Logout from "./components/Auth/Logout"; // Importa el componente Logout

// Componente principal de la aplicación
function App() {
  return (
    <Router>
      <div>
        <NavBar /> {/* Incluye el menú de navegación */}
        {/* Configuramos el Router para manejar diferentes rutas en la aplicación */}
        <Routes>
          {/* Ruta para la página de inicio de sesión */}
          <Route path="/login" element={<Login />} />

          {/* Ruta para la página de registro */}
          <Route path="/register" element={<Register />} />

          {/* Ruta para la lista de productos */}
          <Route path="/items" element={<ItemList />} />

          {/* Ruta para los detalles de un producto específico */}
          <Route path="/items/:id" element={<ItemDetail />} />

          {/* Ruta para ver el carrito de compras */}
          <Route path="/cart" element={<Cart />} />

          {/* Ruta para ver la lista de órdenes del usuario */}
          <Route path="/orders" element={<OrderList />} />

          {/* Ruta para ver los detalles de una orden específica */}
          <Route path="/orders/:id" element={<OrderDetail />} />

          {/* Ruta para ver el perfil del usuario */}
          <Route path="/profile" element={<UserProfile />} />

          {/* Ruta para editar el perfil del usuario */}
          <Route path="/edit-profile" element={<UserEditProfile />} />

          {/* Ruta para cerrar sesión */}
          <Route path="/logout" element={<Logout />} />

          {/* Ruta por defecto para la lista de productos */}
          <Route path="/" element={<ItemList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
