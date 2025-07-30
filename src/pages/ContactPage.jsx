import React, { useState } from 'react';
import Header from '../components/Header'; // Import the new Header
import { Box, Container, Typography, Paper, Grid, TextField, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';

const ContactPage = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formValues);
        alert('Thank you for your message! We will get back to you soon.');
        setFormValues({ name: '', email: '', subject: '', message: '' });
    };


    return (
        <Box sx={{ backgroundColor: 'grey.50', minHeight: '100vh' }}>
            <Header />

            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Paper elevation={3} sx={{ p: { xs: 2, md: 5 }, borderRadius: 3 }}>
                    <Box sx={{ textAlign: 'center', mb: 5 }}>
                        <Typography component="h1" variant="h2" fontWeight="bold" gutterBottom>
                            Get In Touch
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            We're here to help and answer any question you might have.
                        </Typography>
                    </Box>

                    <Grid container spacing={5}>
                        {/* Contact Information */}
                        <Grid item xs={12} md={5}>
                            <Typography variant="h5" component="h2" gutterBottom fontWeight="600" color="primary.dark">
                                Contact Information
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Fill up the form and our Team will get back to you within 24 hours.
                            </Typography>
                            <List>
                                <ListItem disablePadding sx={{mb: 1}}>
                                    <ListItemIcon> <Phone color="primary" /> </ListItemIcon>
                                    <ListItemText primary="+91 12345 67890" />
                                </ListItem>
                                <ListItem disablePadding sx={{mb: 1}}>
                                    <ListItemIcon> <Email color="primary" /> </ListItemIcon>
                                    <ListItemText primary="contact@jobsleuth.com" />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemIcon> <LocationOn color="primary" /> </ListItemIcon>
                                    <ListItemText primary="123 Tech Park, Gurugram, Haryana, India" />
                                </ListItem>
                            </List>
                        </Grid>

                        {/* Contact Form */}
                        <Grid item xs={12} md={7}>
                            <Box component="form" noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name="name" label="Your Name" variant="outlined" value={formValues.name} onChange={handleInputChange} fullWidth required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name="email" label="Your Email" type="email" variant="outlined" value={formValues.email} onChange={handleInputChange} fullWidth required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name="subject" label="Subject" variant="outlined" value={formValues.subject} onChange={handleInputChange} fullWidth required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name="message" label="Message" variant="outlined" value={formValues.message} onChange={handleInputChange} fullWidth required multiline rows={5} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" endIcon={<Send />} size="large" fullWidth>
                                            Send Message
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default ContactPage;