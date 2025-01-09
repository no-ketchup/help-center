import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_PAYLOAD_API_KEY;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Authorization': `users API-Key ${API_KEY}`, // Pass API key in headers
        'Content-Type': 'application/json',
    },
});

export default apiClient;