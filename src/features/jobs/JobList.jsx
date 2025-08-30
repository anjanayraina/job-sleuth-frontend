// src/features/jobs/JobList.jsx
import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header";
import JobCard from "../../components/JobCard";
import JobDetailModal from "../../components/JobDetailModal";
import FilterControls from "../../components/FilterControls";
import SearchBar from "../../components/SearchBar";
import { jobService } from "../../services/jobService";
import { userService } from "../../services/userService";
import { Container, Typography, Box, Pagination, CircularProgress, Alert, Stack } from "@mui/material";

export default function JobList() {
    // State for jobs, user, loading, and errors
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    // State for search filters
    const [searchFilters, setSearchFilters] = useState({ keywords: '', location: '', source: '' });

    // State for pagination
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const jobsPerPage = 10;

    // State for the modal
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Centralized data fetching function
    const fetchJobsAndUser = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch user data in parallel
            const userPromise = userService.getMe().catch(() => null);

            // Prepare search request for jobs
            const searchRequest = {
                general_query: searchFilters.keywords,
                location: searchFilters.location,
                source: searchFilters.source,
                limit: jobsPerPage,
                skip: (page - 1) * jobsPerPage,
            };

            const jobsPromise = jobService.searchJobs(searchRequest);

            const [userData, jobsResponse] = await Promise.all([userPromise, jobsPromise]);

            setCurrentUser(userData);
            setJobs(jobsResponse.jobs || []);
            setPageCount(Math.ceil(jobsResponse.total / jobsPerPage));

        } catch (err) {
            setError("Could not fetch jobs. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [page, searchFilters]); // Dependency array for useCallback

    // Effect to fetch data when page or filters change
    useEffect(() => {
        fetchJobsAndUser();
    }, [fetchJobsAndUser]);

    const handleSearch = (newSearchTerms) => {
        setPage(1); // Reset to first page on new search
        setSearchFilters({
            keywords: newSearchTerms.keywords,
            location: newSearchTerms.location,
            source: newSearchTerms.source,
        });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleToggleLike = async (jobId) => {
        if (!currentUser) return;
        const isLiked = currentUser.liked_jobs.includes(jobId);
        try {
            isLiked ? await userService.unlikeJob(jobId) : await userService.likeJob(jobId, {});
            const updatedUser = await userService.getMe();
            setCurrentUser(updatedUser);
        } catch (err) { console.error("Failed to update like status", err); }
    };

    const handleToggleSave = async (jobId) => {
        if (!currentUser) return;
        const isSaved = currentUser.saved_jobs.includes(jobId);
        try {
            isSaved ? await userService.unsaveJob(jobId) : await userService.saveJob(jobId, {});
            const updatedUser = await userService.getMe();
            setCurrentUser(updatedUser);
        } catch (err) { console.error("Failed to update save status", err); }
    };

    const handleOpenModal = (job) => { setSelectedJob(job); setIsModalOpen(true); };
    const handleCloseModal = () => { setIsModalOpen(false); setSelectedJob(null); };

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <SearchBar onSearch={handleSearch} />
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    <Box sx={{ width: { xs: '100%', md: '280px' }, flexShrink: 0 }}>
                        <FilterControls filters={{}} setFilters={() => {}} />
                    </Box>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress size={60} /></Box>
                        ) : error ? (
                            <Alert severity="warning" sx={{ my: 5 }}>{error}</Alert>
                        ) : (
                            <>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Found {pageCount * jobsPerPage > 0 ? (page-1)*jobsPerPage+1 : 0}-{(page-1)*jobsPerPage + jobs.length} of {pageCount*jobsPerPage} jobs
                                </Typography>
                                <Stack spacing={2}>
                                    {jobs.length > 0 ? jobs.map((job) => {
                                        const isLiked = currentUser?.liked_jobs.includes(job._id) || false;
                                        const isSaved = currentUser?.saved_jobs.includes(job._id) || false;
                                        return (
                                            <JobCard
                                                key={job._id}
                                                job={job}
                                                onView={() => handleOpenModal(job)}
                                                isLiked={isLiked}
                                                isSaved={isSaved}
                                                onToggleLike={() => handleToggleLike(job._id)}
                                                onToggleSave={() => handleToggleSave(job._id)}
                                            />
                                        );
                                    }) : <Typography>No jobs found matching your criteria.</Typography>}
                                </Stack>
                                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                                    {pageCount > 1 && (
                                        <Pagination
                                            count={pageCount}
                                            page={page}
                                            onChange={handlePageChange}
                                            color="primary"
                                        />
                                    )}
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </Container>
            <JobDetailModal job={selectedJob} open={isModalOpen} onClose={handleCloseModal} />
        </Box>
    );
}
