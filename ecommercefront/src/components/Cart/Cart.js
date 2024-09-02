// Importamos las bibliotecas necesarias y el servicio de carrito
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario
import cartService from "../../services/cartService";
import orderService from "../../services/orderService"; // Importar el servicio de órdenes
import CartItem from "./CartItem";
import "../../../src/style/style.css";

const Cart = () => {
  // Definimos el estado local para almacenar los artículos del carrito
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(""); // Estado para la dirección de envío
  const navigate = useNavigate(); // Hook para manejar la navegación

  // useEffect se utiliza para cargar los artículos del carrito cuando el componente se monta
  useEffect(() => {
    loadCartItems();
  }, []);

  // Función para cargar los artículos del carrito desde el servicio
  const loadCartItems = async () => {
    try {
      const response = await cartService.getCartItems();
      console.log("Cart items:", response.data);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error loading cart items:", error);
    }
  };

  // Función para manejar la eliminación de un artículo del carrito
  const handleRemoveItem = async (cartItemId) => {
    try {
      await cartService.removeItemFromCart(cartItemId);
      // Volvemos a cargar los artículos después de eliminar uno
      loadCartItems();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  // Función para manejar la creación de una orden
  const handleCreateOrder = async () => {
    if (!shippingAddress) {
      alert("Please enter a shipping address.");
      return;
    }

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          item: item.item, // Enviar el objeto item completo
          itemId: item.item.id, // Además, enviar el itemId por si se necesita en el backend
          quantity: item.quantity,
          unitPrice: item.item.price, // Asegúrate de que el precio unitario también esté presente
        })),
        shippingAddress: shippingAddress, // Usamos la dirección de envío ingresada
      };

      await orderService.createOrder(orderData);
      navigate("/orders"); // Redirigir al usuario a la página de órdenes
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
            ))}
          </ul>
          <div>
            <label htmlFor="shippingAddress">Shipping Address:</label>
            <input
              type="text"
              id="shippingAddress"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter your shipping address"
            />
          </div>
          <button onClick={handleCreateOrder}>Create Order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
