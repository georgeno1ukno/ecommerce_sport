// Importamos las bibliotecas necesarias
import React from "react";
import "../../../src/style/style.css";

const CartItem = ({ item, onRemove }) => {
  return (
    <li>
      <div>
        <h3>{item.item.name}</h3>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ${item.item.price}</p>
        <p>Total: ${item.item.price * item.quantity}</p>
        <button onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </li>
  );
};

export default CartItem;
