import axios from "axios";

const API_URL = "http://localhost:8080/api/cart/";

const getCartItems = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  };
  return axios.get(API_URL, config);
};

const addItemToCart = (itemId, quantity) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  };

  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }

  // Enviar un objeto CartItem con un objeto Item dentro
  return axios.post(
    API_URL + "items",
    {
      item: { id: itemId }, // Enviar el itemId dentro de un objeto Item
      quantity: quantity,
    },
    config
  );
};

const removeItemFromCart = (cartItemId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  };
  return axios.delete(API_URL + "items/" + cartItemId, config);
};

export default {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
};
