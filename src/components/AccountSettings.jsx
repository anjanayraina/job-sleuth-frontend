import React from 'react';
import { Box, Typography, Grid, TextField, Paper, Divider, Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const InfoRow = ({ label, value, icon }) => (
    <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                {icon}
                <Typography variant="body1" sx={{ ml: 1 }}>{label}</Typography>
            </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
            <TextField
                value={value}
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
        </Grid>
    </Grid>
);

const AccountSettings = ({ user }) => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Account Information
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Here are your account details.
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <InfoRow label="Username" value={user.username} icon={<PersonOutlineIcon />} />
            <InfoRow label="Email" value={user.email} icon={<EmailOutlinedIcon />} />
            <InfoRow label="Subscription" value={user.subscription.toUpperCase()} icon={<StarBorderOutlinedIcon />} />

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="secondary" sx={{ mr: 2 }}>
                    Change Password
                </Button>
                <Button variant="contained" color="primary">
                    Upgrade Plan
                </Button>
            </Box>
        </Box>
    );
};

export default AccountSettings;