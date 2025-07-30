import React from 'react';
import { Box } from '@mui/material';
import logoImage from '../assets/logo.png'; // Import the logo image

const Logo = (props) => (
    <Box
        {...props}
        sx={{
            height: { xs: 45, md: 50 }, // Made the logo slightly larger
            width: { xs: 45, md: 50 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <img
            src={logoImage}
            alt="JobSleuth Logo"
            style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                borderRadius: '50%' // This makes the image perfectly round
            }}
        />
    </Box>
);

export default Logo;