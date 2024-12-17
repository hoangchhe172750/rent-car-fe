import {api} from "./api.js";

export async function getUser(userId) {
    try {
        const result = await api.get(`/user/get/${userId}`);
        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function registerUser(user) {
    try {
        const result = await api.post('/user/register', user);
        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function updateUser(userData, userId) {
    try {
        const response = await api.put(`/user/update/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/user/delete/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}