// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import { userService } from '../services/userService';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
}

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tabValue, setTabValue] = useState(0);

    const fetchUser = async () => {
        try {
            const userData = await userService.getMe();
            setUser(userData);
        } catch (err) {
            setError('Could not fetch profile. Please make sure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleToggleLike = async (jobId) => {
        const isLiked = user.liked_jobs.some(j => j.job_hash === jobId);
        try {
            if (isLiked) {
                await userService.unlikeJob(jobId);
            } else {
                await userService.likeJob(jobId);
            }
            fetchUser(); // Re-fetch user data to update the list
        } catch (err) {
            console.error("Failed to update like status", err);
        }
    };

    const handleToggleSave = async (jobId) => {
        const isSaved = user.saved_jobs.some(j => j.job_hash === jobId);
        try {
            if (isSaved) {
                await userService.unsaveJob(jobId);
            } else {
                await userService.saveJob(jobId);
            }
            fetchUser(); // Re-fetch user data to update the list
        } catch (err) {
            console.error("Failed to update save status", err);
        }
    };

    if (loading) {
        return <><Header /><Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box></>;
    }

    if (error) {
        return <><Header /><Container sx={{mt: 4}}><Alert severity="error">{error}</Alert></Container></>;
    }

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">My Profile</Typography>
                    <Typography variant="h6" color="text.secondary">{user.email}</Typography>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                            <Tab label={`Liked Jobs (${user.liked_jobs.length})`} />
                            <Tab label={`Saved Jobs (${user.saved_jobs.length})`} />
                        </Tabs>
                    </Box>
                    <TabPanel value={tabValue} index={0}>
                        <Stack spacing={2}>
                            {user.liked_jobs.map(job => (
                                <JobCard
                                    key={job.job_hash}
                                    job={job}
                                    isLiked={true}
                                    isSaved={user.saved_jobs.some(j => j.job_hash === job.job_hash)}
                                    onToggleLike={handleToggleLike}
                                    onToggleSave={handleToggleSave}
                                />
                            ))}
                        </Stack>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <Stack spacing={2}>
                            {user.saved_jobs.map(job => (
                                <JobCard
                                    key={job.job_hash}
                                    job={job}
                                    isLiked={user.liked_jobs.some(j => j.job_hash === job.job_hash)}
                                    isSaved={true}
                                    onToggleLike={handleToggleLike}
                                    onToggleSave={handleToggleSave}
                                />
                            ))}
                        </Stack>
                    </TabPanel>
                </Paper>
            </Container>
        </Box>
    );
};

export default ProfilePage;