import React, { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button, Container, Grid, Box, CircularProgress } from "@mui/material";
import Header from "../components/Header";
import JobCard from "../components/JobCard";
import { jobService } from "../services/jobService";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LandingPage = () => {
    const [popularJobs, setPopularJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularJobs = async () => {
            try {
                setLoading(true);
                const popularJobsData = await jobService.getMostLikedJobs();
                setPopularJobs(popularJobsData);
            } catch (error) {
                console.error("Failed to fetch popular jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPopularJobs();
    }, []);

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <Header />

            <Container maxWidth="lg" sx={{ py: 4 }}>
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
                            sx={{ py: 1.5, px: 4, borderRadius: '50px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                        >
                            Explore Open Roles
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ py: 6 }}>
                    <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'text.primary' }}>
                        Trending Opportunities
                    </Typography>
                    <Grid container spacing={3}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : popularJobs.length > 0 ? (
                            popularJobs.map((job) => (
                                <Grid item key={job._id} xs={12} sm={6} md={4}>
                                    {/* Pass showActions={false} to hide the like/save buttons */}
                                    <JobCard job={job} onView={() => {}} showActions={false} />
                                </Grid>
                            ))
                        ) : (
                            <Typography sx={{ textAlign: 'center', width: '100%', mt: 4, color: 'text.secondary' }}>
                                No popular jobs found at the moment.
                            </Typography>
                        )}
                    </Grid>
                </Box>
            </Container>

            <Box component="footer" sx={{ py: 3, textAlign: 'center', color: 'text.secondary', mt: 'auto' }}>
                <Typography variant="body2">
                    © 2025 JobSleuth. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;