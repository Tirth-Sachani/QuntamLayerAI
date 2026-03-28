import axios from "axios";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'quntamlayerai.com' ? "https://api.quntamlayerai.com" : "http://localhost:5000");

const api = axios.create({
    baseURL: `${API_BASE}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const submitContact = async (data: {
    name: string;
    email: string;
    message: string;
}) => {
    const res = await api.post("/contact", data);
    return res.data;
};

export const submitLead = async (data: {
    name: string;
    company: string;
    email: string;
    phone?: string;
    budget?: string;
    project_type?: string;
    message?: string;
}) => {
    const res = await api.post("/lead", data);
    return res.data;
};

export default api;
