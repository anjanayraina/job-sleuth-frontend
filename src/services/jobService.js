// src/services/jobService.js
import { apiHelper } from '../utils/apiHelper';

export const jobService = {

    searchJobs: (searchRequest) => {
        return apiHelper.post('/api/search_jobs', searchRequest);
    },


    getMostLikedJobs: () => {
        return apiHelper.get('/api/jobs/most-liked');
    },


    getJobsByIds: (jobIds) => {
        return apiHelper.post('/api/jobs/by-ids', jobIds);
    },
};

