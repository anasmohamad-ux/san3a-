import API from "./axios";

// 1. Get CSRF Cookie
export const getCsrfCookie = async () => {
    return API.get("/sanctum/csrf-cookie");
};

// 2. Login
export const login = async (data) => {
    await getCsrfCookie(); // 🔥 must be called first
    return API.post("/login", data);
};

// 3. Logout
export const logout = async () => {
    return API.post("/logout");
};

// 4. Get Authenticated User
export const getUser = async () => {
    return API.get("/api/user");
};