import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import JobCard from "../../components/JobCard";
import JobDetailModal from "../../components/JobDetailModal";
import FilterControls from "../../components/FilterControls";
import { jobService } from "../../services/jobService";
import {
    Container, Grid, Typography, Box, Pagination,
    CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";

export default function JobList() {
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        search: '',
        platforms: [],
        location: 'all',
    });

    const [page, setPage] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(12); // Default jobs per page

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
            } finally {
                setLoading(false);
            }
        };
        getJobs();
    }, []);

    const filteredJobs = useMemo(() => {
        return allJobs.filter(job => {
            if (!job || !job.title || !job.company) return false;

            const searchLower = filters.search.toLowerCase();
            const searchTermMatch = filters.search === '' ||
                job.title.toLowerCase().includes(searchLower) ||
                job.company.toLowerCase().includes(searchLower) ||
                job.description.toLowerCase().includes(searchLower) ||
                job.source.toLowerCase().includes(searchLower) ||
                (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchLower)));

            const platformMatch = filters.platforms.length === 0 || (job.source && filters.platforms.includes(job.source.toLowerCase()));

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

    const handleJobsPerPageChange = (event) => {
        setJobsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset to the first page when changing items per page
    };

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="xl" sx={{ py: 4, display: 'flex', gap: 4 }}>
                <Box sx={{ width: '25%', display: { xs: 'none', md: 'block' } }}>
                    <FilterControls filters={filters} setFilters={setFilters} />
                </Box>

                <Box sx={{ width: { xs: '100%', md: '75%' } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h5">
                            Showing {filteredJobs.length} open roles
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Jobs per page</InputLabel>
                            <Select
                                value={jobsPerPage}
                                label="Jobs per page"
                                onChange={handleJobsPerPageChange}
                            >
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={24}>24</MenuItem>
                                <MenuItem value={36}>36</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress size={60} /></Box>
                    ) : error ? (
                        <Alert severity="warning" sx={{ my: 5 }}>{error}</Alert>
                    ) : (
                        <>
                            <Grid container spacing={2}>
                                {currentJobs.map((job) => (
                                    <Grid item key={job.job_hash} xs={12} sm={6} md={4}>
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