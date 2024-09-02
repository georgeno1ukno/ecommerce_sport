// Importamos las bibliotecas necesarias y el servicio de productos
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import itemService from "../../services/itemService";
import cartService from "../../services/cartService";

const ItemDetail = () => {
  // Definimos el estado local para almacenar los detalles del producto y la cantidad
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  // useEffect se utiliza para cargar los detalles del producto cuando el componente se monta
  useEffect(() => {
    loadItem();
  }, [id]);

  // Función para cargar los detalles del producto desde el servicio
  const loadItem = async () => {
    try {
      const response = await itemService.getItemById(id);
      setItem(response.data);
    } catch (error) {
      console.error("Error loading item:", error);
    }
  };

  // Función para manejar la adición del producto al carrito
  const handleAddToCart = async () => {
    try {
      await cartService.addItemToCart(id, quantity);
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  if (!item) {
    return <p>Loading item details...</p>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <p>Description: {item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Stock: {item.stockQuantity}</p>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          max={item.stockQuantity}
        />
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ItemDetail;
