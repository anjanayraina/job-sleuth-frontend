import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Box, Container, Typography, Paper, Grid, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { Send } from '@mui/icons-material';
import { userService } from '../services/userService';

const ContactPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState({
        subject: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState({
        submitted: false,
        error: false,
        message: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await userService.getMe();
                setUser(userData);
            } catch (err) {
                setError('You must be logged in to send a message.');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ submitted: false, error: false, message: '' }); // Reset status on new submission
        try {
            await userService.contactUs({
                MailSubject: formValues.subject,
                MailBody: formValues.message,
            });
            setSubmitStatus({ submitted: true, error: false, message: 'Your message has been sent successfully!' });
            setFormValues({ subject: '', message: '' }); // Clear form on success
        } catch (err) {
            setSubmitStatus({ submitted: true, error: true, message: 'Failed to send message. Please try again later.' });
        }
    };

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <Header />

            <Container component="main" maxWidth="sm" sx={{ py: 5 }}>
                <Paper elevation={2} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3, mt: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Have a question or feedback? We'd love to hear from you.
                        </Typography>
                    </Box>

                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {error && !loading && (
                        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                    )}

                    {user && !loading && (
                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Sending As"
                                        value={`${user.username} (${user.email})`}
                                        fullWidth
                                        disabled
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="subject"
                                        label="Subject"
                                        variant="outlined"
                                        value={formValues.subject}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="message"
                                        label="Message"
                                        variant="outlined"
                                        value={formValues.message}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        multiline
                                        rows={5}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" endIcon={<Send />} size="large" fullWidth>
                                        Send Message
                                    </Button>
                                </Grid>
                                {submitStatus.submitted && (
                                    <Grid item xs={12}>
                                        <Alert severity={submitStatus.error ? 'error' : 'success'} sx={{ mt: 2 }}>
                                            {submitStatus.message}
                                        </Alert>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default ContactPage;