import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
    baseURL: `${API_BASE}/api/v1`,
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
