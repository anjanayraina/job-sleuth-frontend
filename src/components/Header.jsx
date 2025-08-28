import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Logo from './Logo';
import { authService } from '../services/authService';

export default function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = authService.getToken();
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        authService.logout();
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: 'background.paper' }}>
            <Toolbar>
                {/* ... (logo and left-side links) ... */}
                <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                    <Logo />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', ml: 1.5, display: { xs: 'none', sm: 'block' } }}>
                        JobSleuth
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    <Button color="inherit" component={RouterLink} to="/">Home</Button>
                    <Button color="inherit" component={RouterLink} to="/jobs">Browse Jobs</Button>
                    <Button color="inherit" component={RouterLink} to="/about">About</Button>
                    <Button color="inherit" component={RouterLink} to="/contact">Contact</Button>
                </Box>

                <Box sx={{ ml: 2 }}>
                    {isLoggedIn ? (
                        <>
                            {/* --- THIS IS THE NEW BUTTON --- */}
                            <Button component={RouterLink} to="/profile" sx={{ mr: 1 }}>My Profile</Button>
                            <Button variant="outlined" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button component={RouterLink} to="/login" sx={{ mr: 1 }}>Login</Button>
                            <Button component={RouterLink} to="/signup" variant="contained">Sign Up</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}