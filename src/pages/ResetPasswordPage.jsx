import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import Header from '../components/Header';
import { Box, Container, Typography, Paper, TextField, Button, Alert, CircularProgress } from '@mui/material';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({ email: '', otp: '', newPassword: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setMessage('');

        try {
            await authService.resetPassword(formValues);
            setMessage('Your password has been reset successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.message || "An error occurred during password reset.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <Header />
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} sx={{ marginTop: 8, p: 4, borderRadius: 2 }}>
                    <Typography component="h1" variant="h5" align="center">Reset Password</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth name="email" label="Email Address" type="email" value={formValues.email} onChange={handleInputChange} />
                        <TextField margin="normal" required fullWidth name="otp" label="OTP" value={formValues.otp} onChange={handleInputChange} />
                        <TextField margin="normal" required fullWidth name="newPassword" label="New Password" type="password" value={formValues.newPassword} onChange={handleInputChange} />
                        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
                        <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2 }}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default ResetPasswordPage;