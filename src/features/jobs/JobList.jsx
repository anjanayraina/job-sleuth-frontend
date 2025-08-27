// src/features/jobs/JobList.jsx
import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import JobCard from "../../components/JobCard";
import JobDetailModal from "../../components/JobDetailModal";
import FilterControls from "../../components/FilterControls";
import SearchBar from "../../components/SearchBar"; // <-- Import the new SearchBar
import { jobService } from "../../services/jobService";
import {
    Container, Grid, Typography, Box, Pagination,
    CircularProgress, Alert, Stack
} from "@mui/material";

export default function JobList() {
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Combine all filters into a single state object
    const [filters, setFilters] = useState({
        keywords: '',
        location: '',
        jobType: [],
        experience: 'any',
        salary: [],
        currency: 'lpa',
        domain: ''
    });

    const [page, setPage] = useState(1);
    const jobsPerPage = 10;

    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getJobs = async () => {
            try {
                setLoading(true);
                const data = await jobService.getJobs();
                setAllJobs(data || []);
            } catch (err) {
                setError("Please log in to view job listings.");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getJobs();
    }, []);

    const handleSearch = (searchTerms) => {
        setFilters(prev => ({
            ...prev,
            keywords: searchTerms.keywords,
            location: searchTerms.location
        }));
    };

    // This logic will now filter based on all the new criteria
    const filteredJobs = useMemo(() => {
        return allJobs.filter(job => {
            if (!job || !job.title || !job.company) return false;

            const keywordsLower = filters.keywords.toLowerCase();
            const locationLower = filters.location.toLowerCase();

            // Keyword and Location Search
            const keywordMatch = filters.keywords === '' ||
                job.title.toLowerCase().includes(keywordsLower) ||
                job.company.toLowerCase().includes(keywordsLower) ||
                (job.tags && job.tags.some(tag => tag.toLowerCase().includes(keywordsLower)));

            const locationMatch = filters.location === '' ||
                (job.location && job.location.toLowerCase().includes(locationLower));

            // Sidebar Filters
            const jobTypeMatch = filters.jobType.length === 0 ||
                (job.jobType && filters.jobType.includes(job.jobType));

            // You would add more complex logic for experience and salary here
            // based on how your job data is structured.

            return keywordMatch && locationMatch && jobTypeMatch;
        });
    }, [allJobs, filters]);

    const currentJobs = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);
    const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);

    const handleOpenModal = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Use the new SearchBar component */}
                <SearchBar onSearch={handleSearch} />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    <Box sx={{ width: { xs: '100%', md: '280px' }, flexShrink: 0 }}>
                        <FilterControls filters={filters} setFilters={setFilters} />
                    </Box>

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Showing {filteredJobs.length} Jobs
                        </Typography>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress size={60} /></Box>
                        ) : error ? (
                            <Alert severity="warning" sx={{ my: 5 }}>{error}</Alert>
                        ) : (
                            <Stack spacing={2}>
                                {currentJobs.length > 0 ? (
                                    currentJobs.map((job) => (
                                        <JobCard key={job.job_hash} job={job} onView={() => handleOpenModal(job)} />
                                    ))
                                ) : (
                                    <Typography sx={{textAlign: 'center', mt: 4}}>No jobs found matching your criteria.</Typography>
                                )}
                            </Stack>
                        )}
                        {filteredJobs.length > jobsPerPage &&
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Pagination count={pageCount} page={page} onChange={(e, value) => setPage(value)} color="primary" />
                            </Box>
                        }
                    </Box>
                </Box>
            </Container>

            <JobDetailModal
                job={selectedJob}
                open={isModalOpen}
                onClose={handleCloseModal}
            />
        </Box>
    );
}