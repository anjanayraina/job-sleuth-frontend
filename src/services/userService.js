// src/services/userService.js
import { apiHelper } from '../utils/apiHelper';

export const userService = {
    getMe: () => apiHelper.get('/api/users/me'),
    searchUsers: (query) => apiHelper.get('/api/users/', { search: query }),

    /**
     * Adds a job to the user's liked jobs list.
     * @param {string} jobId - The job's unique '_id'.
     */
    likeJob: (jobId) => apiHelper.post(`/api/users/me/liked-jobs/${jobId}`),

    /**
     * Removes a job from the user's liked jobs list.
     * @param {string} jobId - The job's unique '_id'.
     */
    unlikeJob: (jobId) => apiHelper.delete(`/api/users/me/liked-jobs/${jobId}`),

    /**
     * Adds a job to the user's saved jobs list.
     * @param {string} jobId - The job's unique '_id'.
     */
    saveJob: (jobId) => apiHelper.post(`/api/users/me/saved-jobs/${jobId}`),

    /**
     * Removes a job from the user's saved jobs list.
     * @param {string} jobId - The job's unique '_id'.
     */
    unsaveJob: (jobId) => apiHelper.delete(`/api/users/me/saved-jobs/${jobId}`)
};