import { apiHelper } from '../utils/apiHelper';

export const authService = {
    /**
     * Logs in a user. Note that FastAPI's default OAuth2 setup expects form data.
     * @param {string} email - The user's email, which acts as the 'username'.
     * @param {string} password - The user's password.
     * @returns {Promise<object>} The response containing the access token.
     */
    login: (email, password) => {


        return apiHelper.post('/api/auth/token', {email: email, password: password});
    },

    /**
     * Signs up a new user.
     * @param {string} username
     * @param {string} email
     * @param {string} password
     * @returns {Promise<object>} The response from the server.
     */
    signup: (username, email, password) => {
        return apiHelper.post('/api/auth/signup', { username, email, password });
    },

    /**
     * Stores the access token in localStorage.
     * @param {string} token The JWT access token.
     */
    storeToken: (token) => {
        localStorage.setItem('accessToken', token);
    },

    /**
     * Retrieves the access token from localStorage.
     * @returns {string|null} The token or null if it's not found.
     */
    getToken: () => {
        return localStorage.getItem('accessToken');
    },

    /**
     * Removes the access token to log the user out.
     */
    logout: () => {
        localStorage.removeItem('accessToken');
    },
};