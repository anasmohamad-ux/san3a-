import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true, // 🔥 REQUIRED for Sanctum
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default API;