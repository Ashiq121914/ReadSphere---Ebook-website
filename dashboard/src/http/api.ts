import useTokenStore from "@/store";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post("/api/users/login", data);
  return response;
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/api/users/register", data);
  return response;
};

export const getBooks = async () => {
  const response = await api.get("/api/books");
  return response;
};

export const createBook = async (data: FormData) => {
  const response = api.post("/api/books", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
