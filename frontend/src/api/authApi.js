import api from "./axios";

export const register = async (data) => {
    await api.get('/sanctum/csrf-cookie');
    const response = await api.post('/api/register', data);
    return response.data;
};

export const login = async (data) => {
    await api.get('/sanctum/csrf-cookie');
    const response = await api.post('/api/login', data);
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/api/logout');
    return response.data;
};