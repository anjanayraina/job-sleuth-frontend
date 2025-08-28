// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Tabs, Tab, CircularProgress, Alert, Stack } from '@mui/material';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import { userService } from '../services/userService';
import { jobService } from '../services/jobService'; // We need this to get all jobs

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
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tabValue, setTabValue] = useState(0);

    // Fetch both user data and all jobs to display full job cards
    const fetchData = async () => {
        try {
            setLoading(true);
            const userData = await userService.getMe();
            const jobsData = await jobService.getJobs();
            setUser(userData);
            setAllJobs(jobsData);
        } catch (err) {
            setError('Could not fetch profile data. Please make sure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // These handlers will update the state locally and then refetch for consistency
    const handleToggleLike = async (jobId) => {
        const isLiked = user.liked_jobs.includes(jobId);
        try {
            isLiked ? await userService.unlikeJob(jobId) : await userService.likeJob(jobId);
            const updatedUser = await userService.getMe();
            setUser(updatedUser); // Re-fetch user to update lists
        } catch (err) { console.error("Failed to update like status", err); }
    };

    const handleToggleSave = async (jobId) => {
        const isSaved = user.saved_jobs.includes(jobId);
        try {
            isSaved ? await userService.unsaveJob(jobId) : await userService.saveJob(jobId);
            const updatedUser = await userService.getMe();
            setUser(updatedUser); // Re-fetch user to update lists
        } catch (err) { console.error("Failed to update save status", err); }
    };

    // Filter all jobs to find ones that match the IDs in user's lists
    const likedJobsList = allJobs.filter(job => user?.liked_jobs.includes(job.id));
    const savedJobsList = allJobs.filter(job => user?.saved_jobs.includes(job.id));

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