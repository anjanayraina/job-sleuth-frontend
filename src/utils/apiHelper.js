/**
 * A helper function to handle API requests.
 * It abstracts away the boilerplate of fetch, headers, and error handling.
 */
const request = async (endpoint, options = {}) => {
    // The full URL to the backend endpoint is hardcoded here.
    const url = `http://localhost:8000/jobs`;

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
        console.log("Fetching from hardcoded URL: ", url);
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
    /**
     * Makes a GET request to the hardcoded URL.
     * The 'endpoint' and 'params' arguments are now ignored.
     */
    get: (endpoint, params) => {
        return request(endpoint, { method: 'GET' });
    },

    /**
     * Makes a POST request. The endpoint is ignored, but the body is sent.
     * Note: This will still send the request to the hardcoded URL in the `request` function.
     */
    post: (endpoint, body) => {
        return request(endpoint, { method: 'POST', body: JSON.stringify(body) });
    },
};