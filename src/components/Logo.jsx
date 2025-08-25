import React from 'react';
import { Box } from '@mui/material';
// Corrected the filename from 'logo.png' to 'Logo.png' to match the actual file
import logoImage from '../assets/Logo.png';

const Logo = (props) => (
    <Box
        {...props}
        sx={{
            height: { xs: 45, md: 50 },
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
                borderRadius: '50%'
            }}
        />
    </Box>
);

export default Logo;