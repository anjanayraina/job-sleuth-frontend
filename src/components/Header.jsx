import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Switch, FormControlLabel } from '@mui/material';
import Logo from './Logo';
import { authService } from '../services/authService';
import { useThemeContext } from '../context/ThemeContext.jsx'; // Import the theme context hook

export default function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { mode, toggleColorMode } = useThemeContext(); // Get theme mode and toggle function

    useEffect(() => {
        setIsLoggedIn(authService.isLoggedIn());
    }, []);

    const handleLogout = () => {
        authService.logout();
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: 'background.paper' }}>
            <Toolbar>
                <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                    <Logo />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', ml: 1.5, display: { xs: 'none', sm: 'block' } }}>
                        JobSleuth
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />

                {/* --- THEME TOGGLE SWITCH --- */}
                <FormControlLabel
                    control={<Switch checked={mode === 'dark'} onChange={toggleColorMode} />}
                    label={mode === 'dark' ? 'Dark' : 'Light'}
                    sx={{mr: 2}}
                />

                <Box>
                    {isLoggedIn ? (
                        <>
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