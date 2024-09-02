// Importamos las bibliotecas necesarias y el servicio de productos
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import itemService from "../../services/itemService";

const ItemList = () => {
  // Definimos el estado local para almacenar los productos
  const [items, setItems] = useState([]);

  // useEffect se utiliza para cargar los productos cuando el componente se monta
  useEffect(() => {
    loadItems();
  }, []);

  // Función para cargar los productos desde el servicio
  const loadItems = async () => {
    try {
      const response = await itemService.getAllItems();
      setItems(response.data);
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  return (
    <div>
      <h2>Items</h2>
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Link to={`/items/${item.id}`}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
