import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import Header from '../components/Header';
import { Box, Container, Typography, Paper, TextField, Button, Alert, CircularProgress } from '@mui/material';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setMessage('');

        try {
            await authService.forgotPassword(email);
            setMessage('If an account with that email exists, a password reset OTP has been sent.');
            setTimeout(() => navigate('/reset-password'), 3000);
        } catch (err) {
            setError(err.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <Header />
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} sx={{ marginTop: 8, p: 4, borderRadius: 2 }}>
                    <Typography component="h1" variant="h5" align="center">Forgot Password</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
                        <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2 }}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Email"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default ForgotPasswordPage;