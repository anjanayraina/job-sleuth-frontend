import { API_BASE_URL } from '../config';

/**
 * @param {string} endpoint - The API endpoint to call (e.g., '/jobs').
 * @param {object} options - The options for the fetch request (method, headers, body, etc.).
 * @returns {Promise<any>} - The JSON response from the API.
 */
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
            throw new Error(errorData.message || 'An unknown API error occurred');
        }
        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

// Create pre-configured methods for convenience
export const apiHelper = {
    get: (endpoint, params) => {
        const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
        return request(url, { method: 'GET' });
    },
    post: (endpoint, body) => {
        return request(endpoint, { method: 'POST', body: JSON.stringify(body) });
    },
    put: (endpoint, body) => {
        return request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
    },
    delete: (endpoint) => {
        return request(endpoint, { method: 'DELETE' });
    },
};