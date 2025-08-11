import { apiHelper } from '../utils/apiHelper';

/**
 * A service class for all job-related API calls.
 */
export const jobService = {
    /**
     * Fetches a list of jobs from the backend.
     * @param {object} params - Optional query parameters like { tags: 'react,python' }.
     * @returns {Promise<Array>} A promise that resolves to an array of job objects.
     */
    getJobs: (params) => {
        // This calls your backend's GET /api/jobs endpoint.
        // The apiHelper will automatically append the params to the URL.
        return apiHelper.get('/jobs', params);
    },

    /**
     * Searches for jobs using a detailed POST request.
     * @param {object} jobSearchRequest - The search criteria.
     * @returns {Promise<Array>} A promise that resolves to an array of job objects.
     */
    searchJobs: (jobSearchRequest) => {
        // This calls your backend's POST /api/search_jobs endpoint.
        return apiHelper.post('/search_jobs', jobSearchRequest);
    }
};