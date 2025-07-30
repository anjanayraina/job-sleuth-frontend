import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Logo from './Logo';

export default function Header() {
    return (
        <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
            <Toolbar>
                {/* Logo and Title as a clickable link to home */}
                <Box
                    component={RouterLink}
                    to="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >
                    <Logo />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', ml: 1.5 }}>
                        JobSleuth
                    </Typography>
                </Box>

                {/* This Box pushes the navigation links to the right */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Navigation Links */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    <Button color="inherit" component={RouterLink} to="/">Home</Button>
                    <Button color="inherit" component={RouterLink} to="/about">About</Button>
                    <Button color="inherit" component={RouterLink} to="/contact">Contact</Button>
                    <Button variant="outlined" component={RouterLink} to="/jobs" sx={{ ml: 2 }}>
                        Browse Jobs
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}