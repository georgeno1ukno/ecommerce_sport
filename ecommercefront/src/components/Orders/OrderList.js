// Importamos las bibliotecas necesarias y el servicio de órdenes
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import orderService from "../../services/orderService";
import "../../../src/style/style.css";

const OrderList = () => {
  // Definimos el estado local para almacenar las órdenes
  const [orders, setOrders] = useState([]);

  // useEffect se utiliza para cargar las órdenes cuando el componente se monta
  useEffect(() => {
    loadOrders();
  }, []);

  // Función para cargar las órdenes desde el servicio
  const loadOrders = async () => {
    try {
      const response = await orderService.getUserOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <Link to={`/orders/${order.id}`}>
                <h3>Order #{order.id}</h3>
                <p>Status: {order.orderStatus}</p>
                <p>Total Items: {order.items.length}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
