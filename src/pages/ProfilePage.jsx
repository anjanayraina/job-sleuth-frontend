import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Tabs, Tab, CircularProgress, Alert, Stack, Grid, Avatar } from '@mui/material';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import JobDetailModal from '../components/JobDetailModal';
import { userService } from '../services/userService';
import { jobService } from '../services/jobService';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
    const [likedJobsList, setLikedJobsList] = useState([]);
    const [savedJobsList, setSavedJobsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tabValue, setTabValue] = useState(0);

    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const userData = await userService.getMe();
            setUser(userData);

            if (userData.liked_jobs?.length > 0) {
                const likedJobsData = await jobService.getJobsByIds(userData.liked_jobs);
                setLikedJobsList(likedJobsData);
            } else {
                setLikedJobsList([]);
            }

            if (userData.saved_jobs?.length > 0) {
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

    useEffect(() => {
        fetchData();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleOpenModal = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const handleToggleLike = async (jobId) => {
        const isLiked = user.liked_jobs.includes(jobId);
        try {
            isLiked ? await userService.unlikeJob(jobId) : await userService.likeJob(jobId, {});
            fetchData();
        } catch (err) { console.error("Failed to update like status", err); }
    };

    const handleToggleSave = async (jobId) => {
        const isSaved = user.saved_jobs.includes(jobId);
        try {
            isSaved ? await userService.unsaveJob(jobId) : await userService.saveJob(jobId, {});
            fetchData();
        } catch (err) { console.error("Failed to update save status", err); }
    };

    if (loading) {
        return <><Header /><Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box></>;
    }

    if (error || !user) {
        return <><Header /><Container sx={{mt: 4}}><Alert severity="error">{error || "User data could not be loaded."}</Alert></Container></>;
    }

    return (
        <>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
                <Header />
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    {/* ... (Enriched User Info Section remains the same) ... */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" component="h1" fontWeight="bold">My Profile</Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>Welcome back, {user.username}!</Typography>
                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: 'error.main' }}><FavoriteIcon /></Avatar>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">{likedJobsList.length}</Typography>
                                        <Typography color="text.secondary">Liked Jobs</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: 'primary.main' }}><BookmarkIcon /></Avatar>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">{savedJobsList.length}</Typography>
                                        <Typography color="text.secondary">Saved Jobs</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: 'secondary.main' }}><AccountCircleIcon /></Avatar>
                                    <Box>
                                        <Typography variant="body1" fontWeight="bold">{user.email}</Typography>
                                        <Typography color="text.secondary">Subscription: {user.subscription.toUpperCase()}</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>


                    <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                                <Tab label={`Liked Jobs`} />
                                <Tab label={`Saved Jobs`} />
                            </Tabs>
                        </Box>

                        <TabPanel value={tabValue} index={0}>
                            <Stack spacing={2}>
                                {likedJobsList.length > 0 ? likedJobsList.map(job => (
                                    <JobCard
                                        key={job._id}
                                        job={job}
                                        isLiked={true}
                                        isSaved={user.saved_jobs.includes(job._id)}
                                        onToggleLike={() => handleToggleLike(job._id)}
                                        onToggleSave={() => handleToggleSave(job._id)}
                                        onView={() => handleOpenModal(job)}
                                    />
                                )) : <Typography sx={{ textAlign: 'center', p: 4 }}>You haven't liked any jobs yet.</Typography>}
                            </Stack>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <Stack spacing={2}>
                                {savedJobsList.length > 0 ? savedJobsList.map(job => (
                                    <JobCard
                                        key={job._id}
                                        job={job}
                                        isLiked={user.liked_jobs.includes(job._id)}
                                        isSaved={true}
                                        onToggleLike={() => handleToggleLike(job._id)}
                                        onToggleSave={() => handleToggleSave(job._id)}
                                        onView={() => handleOpenModal(job)}
                                    />
                                )) : <Typography sx={{ textAlign: 'center', p: 4 }}>You haven't saved any jobs yet.</Typography>}
                            </Stack>
                        </TabPanel>
                    </Paper>
                </Container>
            </Box>
            <JobDetailModal job={selectedJob} open={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default ProfilePage;