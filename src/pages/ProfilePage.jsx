// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Tabs, Tab, CircularProgress, Alert, Stack } from '@mui/material';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import { userService } from '../services/userService';
import { jobService } from '../services/jobService';

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
    // State to hold the FULL job objects
    const [likedJobsList, setLikedJobsList] = useState([]);
    const [savedJobsList, setSavedJobsList] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tabValue, setTabValue] = useState(0);

    // This is the new, more efficient data fetching logic
    const fetchData = async () => {
        try {
            setLoading(true);
            const userData = await userService.getMe();
            setUser(userData);

            // Fetch liked and saved jobs only if there are any
            if (userData.liked_jobs && userData.liked_jobs.length > 0) {
                const likedJobsData = await jobService.getJobsByIds(userData.liked_jobs);
                setLikedJobsList(likedJobsData);
            } else {
                setLikedJobsList([]);
            }

            if (userData.saved_jobs && userData.saved_jobs.length > 0) {
                const savedJobsData = await jobService.getJobsByIds(userData.saved_jobs);
                setSavedJobsList(savedJobsData);
            } else {
                setSavedJobsList([]);
            }

        } catch (err) {
            setError('Could not fetch profile data. Please make sure you are logged in.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch data whenever the component loads
    useEffect(() => {
        fetchData();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // These functions now re-trigger the efficient fetchData
    const handleToggleLike = async (jobId) => {
        const isLiked = user.liked_jobs.includes(jobId);
        try {
            isLiked ? await userService.unlikeJob(jobId) : await userService.likeJob(jobId, {});
            fetchData(); // Re-fetch all data to update the UI
        } catch (err) { console.error("Failed to update like status", err); }
    };

    const handleToggleSave = async (jobId) => {
        const isSaved = user.saved_jobs.includes(jobId);
        try {
            isSaved ? await userService.unsaveJob(jobId) : await userService.saveJob(jobId, {});
            fetchData(); // Re-fetch all data to update the UI
        } catch (err) { console.error("Failed to update save status", err); }
    };

    if (loading) {
        return <><Header /><Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box></>;
    }

    if (error || !user) {
        return <><Header /><Container sx={{mt: 4}}><Alert severity="error">{error || 'User not found.'}</Alert></Container></>;
    }

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">My Profile</Typography>
                    <Typography variant="h6" color="text.secondary">{user.email}</Typography>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label={`Liked Jobs (${likedJobsList.length})`} />
                            <Tab label={`Saved Jobs (${savedJobsList.length})`} />
                        </Tabs>
                    </Box>

                    <TabPanel value={tabValue} index={0}>
                        <Stack spacing={2}>
                            {likedJobsList.length > 0 ? likedJobsList.map(job => (
                                <JobCard key={job.id} job={job} isLiked={true} isSaved={user.saved_jobs.includes(job.id)} onToggleLike={handleToggleLike} onToggleSave={handleToggleSave} />
                            )) : <Typography>You haven't liked any jobs yet.</Typography>}
                        </Stack>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <Stack spacing={2}>
                            {savedJobsList.length > 0 ? savedJobsList.map(job => (
                                <JobCard key={job.id} job={job} isLiked={user.liked_jobs.includes(job.id)} isSaved={true} onToggleLike={handleToggleLike} onToggleSave={handleToggleSave} />
                            )) : <Typography>You haven't saved any jobs yet.</Typography>}
                        </Stack>
                    </TabPanel>
                </Paper>
            </Container>
        </Box>
    );
};

export default ProfilePage;