import React from 'react';
import { Box, Container, Typography, Paper, Avatar, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Button } from '@mui/material';
import { WorkOutline, Email, Phone, LocationOn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const AboutPage = () => {
    return (
        <Box sx={{ backgroundColor: 'grey.50', minHeight: '100vh' }}>
            {/* Header */}
            <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <WorkOutline sx={{ mr: 1.5 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        JobSleuth
                    </Typography>
                    <Box>
                        <Button color="inherit" component={RouterLink} to="/">Home</Button>
                        <Button color="inherit" component={RouterLink} to="/about">About</Button>
                        <Button color="inherit" component={RouterLink} to="/contact">Contact</Button>
                        <Button color="inherit" component={RouterLink} to="/jobs">Browse Jobs</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ py: 5 }}>
                <Paper elevation={3} sx={{ p: { xs: 2, md: 5 }, borderRadius: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 64, height: 64 }}>
                            <WorkOutline fontSize="large" />
                        </Avatar>
                        <Typography component="h1" variant="h2" fontWeight="bold" gutterBottom>
                            About JobSleuth
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
                            Your one-stop solution for finding hidden developer jobs in real-time chat communities.
                        </Typography>
                    </Box>

                    <Box sx={{ my: 4 }}>
                        <Typography variant="h4" component="h2" gutterBottom fontWeight="600" color="primary.dark">
                            Our Mission
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                            In the fast-paced world of tech, the best job opportunities are often shared fleetingly in exclusive communities on platforms like Telegram and Discord. These valuable postings can be easily missed. Our mission is to meticulously scan these communities, aggregate the job listings, and present them to you in a clean, searchable, and accessible format. We aim to bridge the gap between talented developers and the innovative companies looking for them.
                        </Typography>
                    </Box>

                    <Box sx={{ my: 4 }}>
                        <Typography variant="h4" component="h2" gutterBottom fontWeight="600" color="primary.dark">
                            Why JobSleuth?
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                            Unlike traditional job boards, JobSleuth focuses on the here and now. We provide you with access to jobs that might not be advertised anywhere else, giving you a competitive edge in your job search. Our platform is built for speed and relevance, ensuring you're always looking at the latest opportunities.
                        </Typography>
                    </Box>

                    <Box sx={{ my: 4 }}>
                        <Typography variant="h4" component="h2" gutterBottom fontWeight="600" color="primary.dark">
                            Contact Us
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Have questions, feedback, or want to partner with us? We'd love to hear from you.
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <Email color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Email" secondary="contact@jobsleuth.com" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Phone color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Phone" secondary="+91 12345 67890" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOn color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Address" secondary="123 Tech Park, Gurugram, Haryana, India" />
                            </ListItem>
                        </List>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default AboutPage;