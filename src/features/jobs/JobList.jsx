import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import JobCard from "../../components/JobCard";
import JobDetailModal from "../../components/JobDetailModal";
import FilterControls from "../../components/FilterControls";
import { jobService } from "../../services/jobService";
import {
    Container, Grid, Typography, Box, Pagination,
    CircularProgress, Alert
} from "@mui/material";

export default function JobList() {
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        search: '',
        platform: 'all',
        location: 'all',
    });

    const [page, setPage] = useState(1);
    const [jobsPerPage] = useState(12);

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
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getJobs();
    }, []);

    const filteredJobs = useMemo(() => {
        return allJobs.filter(job => {
            if (!job || !job.title || !job.company) return false;

            const searchTermMatch = filters.search === '' ||
                job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                job.company.toLowerCase().includes(filters.search.toLowerCase());

            const platformMatch = filters.platform === 'all' || (job.source && job.source.toLowerCase() === filters.platform);

            const locationMatch = filters.location === 'all' || (job.location && job.location.toLowerCase().includes(filters.location.toLowerCase()));

            return searchTermMatch && platformMatch && locationMatch;
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
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="xl" sx={{ py: 4, display: 'flex', gap: 3 }}>
                {/* Left Column: Filters */}
                <Box sx={{ width: '25%', display: { xs: 'none', md: 'block' } }}>
                    <FilterControls filters={filters} setFilters={setFilters} />
                </Box>

                {/* Right Column: Job Listings */}
                <Box sx={{ width: { xs: '100%', md: '75%' } }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Showing {filteredJobs.length} open roles
                    </Typography>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress size={60} /></Box>
                    ) : error ? (
                        <Alert severity="warning" sx={{ my: 5 }}>{error}</Alert>
                    ) : (
                        <>
                            <Grid container spacing={2}>
                                {currentJobs.map((job) => (
                                    <Grid key={job.job_hash} item xs={12} sm={6} md={4}>
                                        <JobCard job={job} onView={() => handleOpenModal(job)} />
                                    </Grid>
                                ))}
                            </Grid>
                            {filteredJobs.length > jobsPerPage &&
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                    <Pagination count={pageCount} page={page} onChange={(e, value) => setPage(value)} color="primary" />
                                </Box>
                            }
                        </>
                    )}
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