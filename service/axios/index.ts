import axios from "axios";

const apiAxiosDataBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DATABASE_API_URL,
});
export const apiAxiosApp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
});

export default apiAxiosDataBase;
