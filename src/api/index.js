import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

api.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.success) {
            return res.data;
        } else {
            throw new Error(res.message);
        }
    },
    (error) => {
        console.error("API Error:", error);
        throw error;
    }
);

export default api;