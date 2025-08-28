import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import JobCard from "../../components/JobCard";
import JobDetailModal from "../../components/JobDetailModal";
import FilterControls from "../../components/FilterControls";
import SearchBar from "../../components/SearchBar";
import { jobService } from "../../services/jobService";
import { userService } from "../../services/userService";
import {
    Container, Typography, Box, Pagination,
    CircularProgress, Alert, Stack
} from "@mui/material";

export default function JobList() {
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const [filters, setFilters] = useState({
        keywords: '', location: '', jobType: [],
        experience: 'any', salary: [], currency: 'lpa', domain: ''
    });
    const [page, setPage] = useState(1);
    const jobsPerPage = 10;
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const jobsData = await jobService.getJobs();
            setAllJobs(jobsData || []);
            const userData = await userService.getMe();
            setCurrentUser(userData);
        } catch (err) {
            setError("Could not fetch jobs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleToggleLike = async (jobId) => {
        if (!currentUser) return;
        // --- FIX: Correctly check if the job ID exists in the user's list ---
        const isLiked = currentUser.liked_jobs.some(job => job._id === jobId);
        try {
            isLiked ? await userService.unlikeJob(jobId) : await userService.likeJob(jobId);
            const updatedUser = await userService.getMe();
            setCurrentUser(updatedUser);
        } catch (err) { console.error("Failed to update like status", err); }
    };

    const handleToggleSave = async (jobId) => {
        if (!currentUser) return;
        // --- FIX: Correctly check if the job ID exists in the user's list ---
        const isSaved = currentUser.saved_jobs.some(job => job._id === jobId);
        try {
            isSaved ? await userService.unsaveJob(jobId) : await userService.saveJob(jobId);
            const updatedUser = await userService.getMe();
            setCurrentUser(updatedUser);
        } catch (err) { console.error("Failed to update save status", err); }
    };

    const handleSearch = (searchTerms) => {
        setFilters(prev => ({ ...prev, keywords: searchTerms.keywords, location: searchTerms.location }));
    };
    const filteredJobs = useMemo(() => {
        return allJobs;
    }, [allJobs, filters]);
    const currentJobs = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);
    const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);
    const handleOpenModal = (job) => { setSelectedJob(job); setIsModalOpen(true); };
    const handleCloseModal = () => { setIsModalOpen(false); setSelectedJob(null); };

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <SearchBar onSearch={handleSearch} />
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    <Box sx={{ width: { xs: '100%', md: '280px' }, flexShrink: 0 }}>
                        <FilterControls filters={filters} setFilters={setFilters} />
                    </Box>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Showing {filteredJobs.length} Jobs</Typography>
                        {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress size={60} /></Box>
                            : error ? <Alert severity="warning" sx={{ my: 5 }}>{error}</Alert>
                                : (
                                    <Stack spacing={2}>
                                        {currentJobs.map((job) => {
                                            // --- FIX: Correctly check the liked/saved status for each card ---
                                            const isLiked = currentUser?.liked_jobs.some(likedJob => likedJob._id === job._id) || false;
                                            const isSaved = currentUser?.saved_jobs.some(savedJob => savedJob._id === job._id) || false;

                                            return (
                                                <JobCard
                                                    // --- FIX: Use the correct unique key ---
                                                    key={job._id}
                                                    job={job}
                                                    onView={() => handleOpenModal(job)}
                                                    isLiked={isLiked}
                                                    isSaved={isSaved}
                                                    onToggleLike={handleToggleLike}
                                                    onToggleSave={handleToggleSave}
                                                />
                                            );
                                        })}
                                    </Stack>
                                )}
                    </Box>
                </Box>
            </Container>
            <JobDetailModal job={selectedJob} open={isModalOpen} onClose={handleCloseModal} />
        </Box>
    );
}