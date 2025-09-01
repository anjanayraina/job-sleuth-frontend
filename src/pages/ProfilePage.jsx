import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, CircularProgress, Alert, Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid, TextField, Button, Divider } from '@mui/material';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import JobDetailModal from '../components/JobDetailModal';
import { userService } from '../services/userService';
import { jobService } from '../services/jobService';
import {AccountSettings} from '../components/AccountSettings';



const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [likedJobsList, setLikedJobsList] = useState([]);
    const [savedJobsList, setSavedJobsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState(0);

    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const userData = await userService.getMe();
            setUser(userData);

            const [likedJobsData, savedJobsData] = await Promise.all([
                userData.liked_jobs?.length > 0 ? jobService.getJobsByIds(userData.liked_jobs) : Promise.resolve([]),
                userData.saved_jobs?.length > 0 ? jobService.getJobsByIds(userData.saved_jobs) : Promise.resolve([])
            ]);
            setLikedJobsList(likedJobsData);
            setSavedJobsList(savedJobsData);
        } catch (err) {
            setError('Could not fetch profile data. Please make sure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenModal = (job) => { setSelectedJob(job); setIsModalOpen(true); };
    const handleCloseModal = () => { setIsModalOpen(false); setSelectedJob(null); };

    const handleToggleLike = async (jobId) => {
        try {
            const isLiked = user.liked_jobs.includes(jobId);
            await (isLiked ? userService.unlikeJob(jobId) : userService.likeJob(jobId));
            fetchData();
        } catch (err) { console.error("Failed to update like status", err); }
    };

    const handleToggleSave = async (jobId) => {
        try {
            const isSaved = user.saved_jobs.includes(jobId);
            await (isSaved ? userService.unsaveJob(jobId) : userService.saveJob(jobId));
            fetchData();
        } catch (err) { console.error("Failed to update save status", err); }
    };

    if (loading) return <><Header /><Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box></>;
    if (error || !user) return <><Header /><Container sx={{ mt: 4 }}><Alert severity="error">{error || "User data could not be loaded."}</Alert></Container></>;

        return (
        <>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
                <Header />
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Box sx={{ display: 'flex' }}>
                        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                        <Box component="main" sx={{ flexGrow: 1, pl: { sm: 3 } }}>
                            <Paper sx={{ p: 4 }}>
                                {activeTab === 0 && (
                                    <>
                                        <Typography variant="h5" gutterBottom>Liked Jobs</Typography>
                                        <Stack spacing={2}>
                                            {likedJobsList.length > 0 ? likedJobsList.map(job => (
                                                <JobCard key={job._id} job={job} isLiked={true} isSaved={user.saved_jobs.includes(job._id)} onToggleLike={() => handleToggleLike(job._id)} onToggleSave={() => handleToggleSave(job._id)} onView={() => handleOpenModal(job)} />
                                            )) : <Typography>You haven't liked any jobs yet.</Typography>}
                                        </Stack>
                                    </>
                                )}
                                {activeTab === 1 && (
                                    <>
                                        <Typography variant="h5" gutterBottom>Saved Jobs</Typography>
                                        <Stack spacing={2}>
                                            {savedJobsList.length > 0 ? savedJobsList.map(job => (
                                                <JobCard key={job._id} job={job} isLiked={user.liked_jobs.includes(job._id)} isSaved={true} onToggleLike={() => handleToggleLike(job._id)} onToggleSave={() => handleToggleSave(job._id)} onView={() => handleOpenModal(job)} />
                                            )) : <Typography>You haven't saved any jobs yet.</Typography>}
                                        </Stack>
                                    </>
                                )}
                                {activeTab === 2 && (
                                    <AccountSettings user={user} />
                                )}
                            </Paper>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <JobDetailModal job={selectedJob} open={isModalOpen} onClose={handleCloseModal} />
        </>
        );
        };

        export default ProfilePage;