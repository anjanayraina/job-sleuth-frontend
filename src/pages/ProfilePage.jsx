import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, CircularProgress, Alert, Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid, TextField, Button, Divider } from '@mui/material';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import JobDetailModal from '../components/JobDetailModal';
import { userService } from '../services/userService';
import { jobService } from '../services/jobService';

// Icons for the new UI
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';


// --- START: Helper components are now inside this file ---

const Sidebar = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { text: 'Liked Jobs', icon: <FavoriteIcon />, index: 0 },
        { text: 'Saved Jobs', icon: <BookmarkIcon />, index: 1 },
        { text: 'Account', icon: <AccountCircleIcon />, index: 2 },
    ];

    return (
        <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            selected={activeTab === item.index}
                            onClick={() => setActiveTab(item.index)}
                            sx={{
                                borderRadius: 1,
                                mb: 1,
                                '&.Mui-selected': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

const InfoRow = ({ label, value, icon }) => (
    <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                {icon}
                <Typography variant="body1" sx={{ ml: 1 }}>{label}</Typography>
            </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
            <TextField
                value={value}
                fullWidth
                InputProps={{ readOnly: true }}
                variant="outlined"
            />
        </Grid>
    </Grid>
);

const AccountSettings = ({ user }) => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>Account Information</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Here are your account details.
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <InfoRow label="Username" value={user.username} icon={<PersonOutlineIcon />} />
            <InfoRow label="Email" value={user.email} icon={<EmailOutlinedIcon />} />
            <InfoRow label="Subscription" value={user.subscription.toUpperCase()} icon={<StarBorderOutlinedIcon />} />
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="secondary" sx={{ mr: 2 }}>Change Password</Button>
                <Button variant="contained" color="primary">Upgrade Plan</Button>
            </Box>
        </Box>
    );
};

// --- END: Helper components ---


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