// src/services/jobService.js
import { apiHelper } from '../utils/apiHelper';

export const jobService = {
    /**
     * Searches for jobs using a detailed POST request with pagination.
     * @param {object} searchRequest - The search criteria, including limit and skip.
     * @returns {Promise<{total: number, jobs: Array}>} A promise that resolves to an object with jobs and total count.
     */
    searchJobs: (searchRequest) => {
        // This calls your backend's POST /api/search_jobs endpoint.
        return apiHelper.post('/api/search_jobs', searchRequest);
    },

    getMostLikedJobs: () => {
        return apiHelper.get('/api/jobs/most-liked');
    },

    getJobsByIds: (jobIds) => {
        return apiHelper.post('/api/jobs/by-ids', jobIds);
    },
};
