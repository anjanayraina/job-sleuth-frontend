import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import JobCard from "../../components/JobCard";
import JobDetailModal from "../../components/JobDetailModal";
import FilterControls from "../../components/FilterControls";
import { jobService } from "../../services/jobService";
import {
    Container, Grid, Typography, Box, Pagination,
    CircularProgress, Alert, Stack
} from "@mui/material";

export default function JobList() {
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        jobType: 'Full Time',
        experience: [],
        salary: [],
        domain: ''
    });

    const [page, setPage] = useState(1);
    const jobsPerPage = 10; // Let's set a fixed number per page

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

    // NOTE: This filtering logic is basic. You'll need to adapt it
    // based on the actual data you get from your API (e.g., salary ranges).
    const filteredJobs = useMemo(() => {
        return allJobs.filter(job => {
            if (!job || !job.title || !job.company) return false;
            // Add your complex filtering logic here based on the new filter state
            return true;
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
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Intro Text Block */}
                <Box sx={{ textAlign: 'center', my: 4 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Loved by 100,000+ professionals
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: '600px', mx: 'auto' }}>
                        Join hundreds of professionals who have found their dream jobs through JobSleuth. With over 5,000 active jobs and global opportunities, your next career move is just a click away.
                    </Typography>
                </Box>

                {/* Main Two-Column Layout */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    {/* Filters Sidebar */}
                    <Box sx={{ width: { xs: '100%', md: '280px' }, flexShrink: 0 }}>
                        <FilterControls filters={filters} setFilters={setFilters} />
                    </Box>

                    {/* Job Listings */}
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress size={60} /></Box>
                        ) : error ? (
                            <Alert severity="warning" sx={{ my: 5 }}>{error}</Alert>
                        ) : (
                            <Stack spacing={2}>
                                {currentJobs.map((job) => (
                                    <JobCard key={job.job_hash} job={job} onView={() => handleOpenModal(job)} />
                                ))}
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