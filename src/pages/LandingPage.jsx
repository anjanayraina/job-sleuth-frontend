import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button, Container, Grid, Box, Paper } from "@mui/material";
import Header from "../components/Header";
import JobCard from "../components/JobCard";
import { jobService } from "../services/jobService";
import { useEffect, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LandingPage = () => {
    const [latestJobs, setLatestJobs] = useState([]);

    useEffect(() => {
        const fetchLatestJobs = async () => {
            try {
                // Fetch all jobs and take the first 6
                const allJobs = await jobService.getJobs();
                setLatestJobs(allJobs.slice(0, 6));
            } catch (error) {
                console.error("Failed to fetch latest jobs:", error);
            }
        };
        fetchLatestJobs();
    }, []);

    const handleViewJob = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <Header />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* --- New Hero Section --- */}
                <Box
                    sx={{
                        textAlign: 'center',
                        color: 'white',
                        py: { xs: 10, md: 16 },
                        my: 4,
                        borderRadius: 4,
                        overflow: 'hidden',
                        position: 'relative',
                        background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                        boxShadow: (theme) => `0 20px 40px -10px ${theme.palette.primary.main}40`,
                        '&::before, &::after': {
                            content: '""',
                            position: 'absolute',
                            borderRadius: '50%',
                            opacity: 0.15,
                            filter: 'blur(30px)',
                        },
                        '&::before': {
                            width: 200,
                            height: 200,
                            background: 'secondary.main',
                            top: -50,
                            left: -50,
                        },
                        '&::after': {
                            width: 300,
                            height: 300,
                            background: 'primary.light',
                            bottom: -100,
                            right: -100,
                        },
                    }}
                >
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography variant="h2" component="h1" fontWeight="900" gutterBottom>
                            Find Your Niche, Find Your Job.
                        </Typography>
                        <Typography variant="h6" component="p" sx={{ mb: 4, color: 'primary.light', maxWidth: '600px', mx: 'auto' }}>
                            We scan Telegram, Discord, and niche job boards so you don't have to. Discover hidden opportunities before they go mainstream.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            component={RouterLink}
                            to="/jobs"
                            color="secondary"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: '50px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            }}
                        >
                            Explore Open Roles
                        </Button>
                    </Box>
                </Box>

                {/* --- Latest Jobs Section --- */}
                <Box sx={{ py: 6 }}>
                    <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'text.primary' }}>
                        Latest Opportunities
                    </Typography>
                    <Grid container spacing={3}>
                        {latestJobs.length > 0 ? (
                            latestJobs.map((job) => (
                                <Grid item key={job.job_hash} xs={12} sm={6} md={4}>
                                    <JobCard job={job} onView={() => { /* Modal will handle this on the jobs page */ }} />
                                </Grid>
                            ))
                        ) : (
                            <Typography sx={{ textAlign: 'center', width: '100%', mt: 4, color: 'text.secondary' }}>
                                Loading latest jobs...
                            </Typography>
                        )}
                    </Grid>
                </Box>
            </Container>

            {/* A simple footer */}
            <Box component="footer" sx={{ py: 3, textAlign: 'center', color: 'text.secondary', mt: 'auto' }}>
                <Typography variant="body2">
                    © 2025 JobSleuth. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;