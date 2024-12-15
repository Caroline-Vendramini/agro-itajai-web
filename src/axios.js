import defaultAxios from "axios";

const token = localStorage.getItem("token");

const axios = defaultAxios.create({
  baseURL: "http://localhost:3010", // TODO: Substituir com o valor do backend via .env
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axios;
