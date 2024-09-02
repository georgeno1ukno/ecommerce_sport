// Importamos las bibliotecas necesarias y el servicio de órdenes
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import orderService from "../../services/orderService";

const OrderDetail = () => {
  // Definimos el estado local para almacenar los detalles de la orden
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  // useEffect se utiliza para cargar los detalles de la orden cuando el componente se monta
  useEffect(() => {
    loadOrder();
  }, [id]);

  // Función para cargar los detalles de la orden desde el servicio
  const loadOrder = async () => {
    try {
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      console.error("Error loading order:", error);
    }
  };

  if (!order) {
    return <p>Loading order details...</p>;
  }

  return (
    <div>
      <h2>Order #{order.id}</h2>
      <p>Status: {order.orderStatus}</p>
      <p>Shipping Address: {order.shippingAddress}</p>
      <h3>Items:</h3>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            <h4>{item.item.name}</h4>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.item.price}</p>
            <p>Total: ${item.quantity * item.item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
