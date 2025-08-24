import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { authService } from '../services/authService';
import Header from '../components/Header';
import { Box, Container, Typography, Paper, TextField, Button, Grid, Link, Avatar, Alert, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        try {
            const response = await authService.login(email, password);
            if (response && response.access_token) {
                authService.storeToken(response.access_token);
                // Redirect to the homepage on successful login
                navigate('/');
                window.location.reload(); // Force a reload to update the header
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            setError(err.message || "An error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <Header />
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, borderRadius: 2 }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><LockOutlinedIcon /></Avatar>
                    <Typography component="h1" variant="h5">Sign In</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                        <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2 }}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to="/signup" variant="body2">{"Don't have an account? Sign Up"}</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;