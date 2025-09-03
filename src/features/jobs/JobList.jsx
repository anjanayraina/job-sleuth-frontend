// src/features/jobs/JobList.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import JobCard from "../../components/JobCard";
import JobDetailModal from "../../components/JobDetailModal";
import FilterControls from "../../components/FilterControls";
import SearchBar from "../../components/SearchBar";
import { jobService } from "../../services/jobService";
import { userService } from "../../services/userService";
import { authService } from "../../services/authService";
import { Container, Typography, Box, Pagination, CircularProgress, Alert, Stack } from "@mui/material";

export default function JobList() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [filters, setFilters] = useState({
        keywords: '', location: '', source: '', jobType: [],
        experience: 'any', salary_type: 'any'
    });

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const jobsPerPage = 10;

    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const loggedIn = authService.isLoggedIn();
            setIsLoggedIn(loggedIn);

            if (loggedIn) {
                const userPromise = userService.getMe();
                const searchRequest = {
                    general_query: filters.keywords, location: filters.location, source: filters.source,
                    job_type: filters.jobType.join(','), experience_level: filters.experience,
                    salary_type: filters.salary_type, limit: jobsPerPage, skip: (page - 1) * jobsPerPage,
                };
                const jobsPromise = jobService.searchJobs(searchRequest);
                const [userData, jobsResponse] = await Promise.all([userPromise, jobsPromise]);

                setCurrentUser(userData);
                setJobs(jobsResponse.jobs || []);
                setPageCount(Math.ceil((jobsResponse.total || 0) / jobsPerPage));
            } else {
                const publicJobs = await jobService.getPublicJobs();
                setJobs(publicJobs || []);
                setPageCount(1);
            }
        } catch (err) {
            setError("Could not fetch jobs. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [page, filters]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearch = (searchTerms) => {
        if (!isLoggedIn) { navigate('/login'); return; }
        setPage(1);
        setFilters(prev => ({ ...prev, ...searchTerms, jobType: [], experience: 'any', salary_type: 'any' }));
    };

    const handlePageChange = (event, value) => {
        if (value > 1 && !isLoggedIn) {
            navigate('/login');
            return;
        }
        setPage(value);
    };

    const handleActionClick = () => {
        if (!isLoggedIn) {
            navigate('/login');
            return true;
        }
        return false;
    };

    const handleToggleLike = async (jobId) => {
        if (handleActionClick()) return;
        const isLiked = currentUser.liked_jobs.includes(jobId);
        try {
            await (isLiked ? userService.unlikeJob(jobId) : userService.likeJob(jobId));
            const updatedUser = await userService.getMe();
            setCurrentUser(updatedUser);
            setJobs(prevJobs => prevJobs.map(job =>
                job._id === jobId ? { ...job, like_count: isLiked ? job.like_count - 1 : job.like_count + 1 } : job
            ));
        } catch (err) { console.error("Failed to update like status", err); }
    };

    const handleToggleSave = async (jobId) => {
        if (handleActionClick()) return;
        const isSaved = currentUser.saved_jobs.includes(jobId);
        try {
            await (isSaved ? userService.unsaveJob(jobId) : userService.saveJob(jobId));
            const updatedUser = await userService.getMe();
            setCurrentUser(updatedUser);
        } catch (err) { console.error("Failed to update save status", err); }
    };

    // --- FIX: Add these missing function definitions ---
    const handleOpenModal = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };
    // --- END FIX ---

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <SearchBar onSearch={handleSearch} disabled={!isLoggedIn} />
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    <Box sx={{ width: { xs: '100%', md: '280px' }, flexShrink: 0 }}>
                        <FilterControls filters={filters} setFilters={setFilters} disabled={!isLoggedIn} />
                    </Box>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        {loading ? (<Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress size={60} /></Box>
                        ) : error ? (<Alert severity="warning" sx={{ my: 5 }}>{error}</Alert>
                        ) : (
                            <>
                                <Stack spacing={2}>
                                    {jobs.length > 0 ? jobs.map((job) => (
                                        <JobCard
                                            key={job._id} job={job} onView={() => handleOpenModal(job)}
                                            isLiked={currentUser?.liked_jobs.includes(job._id) || false}
                                            isSaved={currentUser?.saved_jobs.includes(job._id) || false}
                                            onToggleLike={() => handleToggleLike(job._id)}
                                            onToggleSave={() => handleToggleSave(job._id)}
                                        />
                                    )) : <Typography>No jobs found.</Typography>}
                                </Stack>
                                {pageCount > 1 && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                                        <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
                                    </Box>
                                )}
                            </>
                        )}
                    </Box>
                </Box>
            </Container>
            <JobDetailModal job={selectedJob} open={isModalOpen} onClose={handleCloseModal} />
        </Box>
    );
}