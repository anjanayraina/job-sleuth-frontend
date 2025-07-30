import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { WorkOutline } from '@mui/icons-material';

export default function Header() {
    return (
        <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
            <Toolbar>
                <WorkOutline sx={{ mr: 1.5 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    JobSleuth
                </Typography>
                <Box>
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