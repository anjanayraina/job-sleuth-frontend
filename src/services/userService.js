// src/services/userService.js
import { apiHelper } from '../utils/apiHelper';

export const userService = {
    getMe: () => apiHelper.get('/api/users/me'),
    searchUsers: (query) => apiHelper.get('/api/users/', { search: query }),

    likeJob: (jobId) => apiHelper.post(`/api/users/me/liked-jobs/${jobId}`, {}),
    unlikeJob: (jobId) => apiHelper.delete(`/api/users/me/liked-jobs/${jobId}`),

    saveJob: (jobId) => apiHelper.post(`/api/users/me/saved-jobs/${jobId}`, {}),
    unsaveJob: (jobId) => apiHelper.delete(`/api/users/me/saved-jobs/${jobId}`),
    contactUs: (contactData) => apiHelper.post('/api/connect/contact-us', contactData),
};