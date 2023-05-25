import axios from "axios";

const apiAxios = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});

export default apiAxios;
