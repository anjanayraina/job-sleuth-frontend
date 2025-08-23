import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { authService } from '../services/authService';
import Header from '../components/Header';
import { Box, Container, Typography, Paper, TextField, Button, Grid, Link, Avatar, Alert, CircularProgress } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const email = data.get('email');
        const password = data.get('password');

        try {
            await authService.signup(username, email, password);
            navigate('/login'); // Redirect to login page on success
        } catch (err) {
            setError(err.message || "An error occurred during sign up.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <Header />
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, borderRadius: 2 }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><PersonAddOutlinedIcon /></Avatar>
                    <Typography component="h1" variant="h5">Sign Up</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField name="username" required fullWidth id="username" label="Username" autoFocus />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
                            </Grid>
                        </Grid>
                        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                        <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2 }}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to="/login" variant="body2">Already have an account? Sign in</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default SignUpPage;