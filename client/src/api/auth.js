import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const register = async (data) => API.post("/auth/register", data);

export const login = async (data) => API.post("/auth/login", data);
