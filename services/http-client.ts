import axios from "axios";

const apiVersion: string = "v1";
export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    `http://localhost:5000/api/${apiVersion}`,
  withCredentials: true, // Equivalent to fetch's 'credentials: include'
  headers: {
    "Content-Type": "application/json", // Default Content-Type
  },
});
