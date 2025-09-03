import {API_BASE_URL} from '../config';
import {authService} from '../services/authService';

const request = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = authService.getToken();
    const defaultHeaders = { 'Accept': 'application/json' };

    if (!(options.body instanceof URLSearchParams)) {
        defaultHeaders['Content-Type'] = 'application/json';
    }

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = { ...options, headers: { ...defaultHeaders, ...options.headers } };

    try {
        const response = await fetch(url, config);

        // FIX: Only run this logic if the error is NOT from the login page itself.
        if (response.status === 401 && endpoint !== '/api/auth/token') {
            authService.logout();
            window.location.href = '/login';
            throw new Error('Session expired. Redirecting to login.');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorData.detail || errorData.message || 'An API error occurred');
        }
        return response.status === 204 ? null : response.json();
    } catch (error) {
        if (error.message !== 'Session expired. Redirecting to login.') {
            console.error('API Helper Error:', error);
        }
        throw error;
    }
};

export const apiHelper = {
    get: (endpoint, params) => {
        let url = endpoint;
        if (params) {
            const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null && v !== ''));
            if (Object.keys(filteredParams).length > 0) {
                url += `?${new URLSearchParams(filteredParams)}`;
            }
        }
        return request(url, {method: 'GET'});
    },
    post: (endpoint, body) => {
        const isFormData = body instanceof URLSearchParams;
        return request(endpoint, {
            method: 'POST',
            body: isFormData ? body : JSON.stringify(body)
        });
    },
    delete: (endpoint) => {
        return request(endpoint, {method: 'DELETE'});
    },

    getJobsByIds: (jobIds) => {
        return apiHelper.post('/api/jobs/by-ids', jobIds);
    },
};