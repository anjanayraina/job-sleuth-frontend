import { API_BASE_URL } from '../config';


const request = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorData.detail || errorData.message || 'An API error occurred');
        }
        return response.json();
    } catch (error) {
        console.error('API Helper Error:', error);
        throw error;
    }
};

export const apiHelper = {
    get: (endpoint, params) => {
        const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
        return request(url, { method: 'GET' });
    },
    post: (endpoint, body) => {
        return request(endpoint, { method: 'POST', body: JSON.stringify(body) });
    }
};