import axios from "axios";

const API_URL = "http://localhost:8080/api/orders/";

const createOrder = (orderData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  };
  return axios.post(API_URL, orderData, config);
};

const getUserOrders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  };
  return axios.get(API_URL, config);
};

const getOrderById = (orderId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  };
  return axios.get(API_URL + orderId, config);
};

export default {
  createOrder,
  getUserOrders,
  getOrderById,
};
