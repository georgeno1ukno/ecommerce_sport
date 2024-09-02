import axios from "axios";

const API_URL = "http://localhost:8080/api/items/";

const getAllItems = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  };
  const res = axios.get(API_URL, config);
  console.log("conff", res);
  return res;
};

const getItemById = (itemId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  };
  return axios.get(API_URL + itemId, config);
};

export default {
  getAllItems,
  getItemById,
};
