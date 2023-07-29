import axios from "axios";

const apiAxiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DATABASE_API_URL,
});
export const apiAxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
});

export default apiAxiosServer;
