import React from 'react';
import Header from '../components/Header';
import { Box, Container, Typography, Paper, Button, Avatar } from '@mui/material';
import { Coffee } from '@mui/icons-material';

const BuyMeACoffeePage = () => {
    return (
        <Box sx={{ backgroundColor: 'grey.50', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="md" sx={{ py: 5 }}>
                <Paper elevation={3} sx={{ p: { xs: 2, md: 5 }, borderRadius: 3, textAlign: 'center' }}>
                    <Avatar sx={{ m: 'auto', bgcolor: 'primary.main', width: 64, height: 64 }}>
                        <Coffee fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h2" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                        Support JobSleuth
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                        Keeping the gears turning.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                        We're thrilled to offer JobSleuth as a free service to help you find your next opportunity. We believe in open access to information and want to keep it that way.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 4 }}>
                        However, running a service like this involves costs for servers, maintenance, and development. If you find JobSleuth helpful, please consider supporting us with a small donation. Every contribution, no matter the size, helps us keep the lights on and continue to improve the platform.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        href="https://www.paypal.com/paypalme/AnjanayRaina"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ py: 1.5, px: 4, borderRadius: '50px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                    >
                        Buy Me a Coffee via PayPal
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
};

export default BuyMeACoffeePage;