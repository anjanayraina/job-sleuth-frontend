import React from 'react';
import { Box, TextField, Paper, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const FilterControls = ({ search, setSearch, platform, setPlatform, location, setLocation }) => {
    const handlePlatformChange = (event, newPlatform) => {
        if (newPlatform !== null) {
            setPlatform(newPlatform);
        }
    };

    const handleLocationChange = (event, newLocation) => {
        if (newLocation !== null) {
            setLocation(newLocation);
        }
    };

    return (
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: 3 }}>
            <TextField
                fullWidth
                placeholder="Search by title, company, or keyword..."
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                    startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 'bold' }}>Platform</Typography>
                    <ToggleButtonGroup
                        value={platform}
                        exclusive
                        onChange={handlePlatformChange}
                        aria-label="platform filter"
                    >
                        <ToggleButton value="all" aria-label="all platforms">All</ToggleButton>
                        <ToggleButton value="telegram" aria-label="telegram">Telegram</ToggleButton>
                        <ToggleButton value="discord" aria-label="discord">Discord</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 'bold' }}>Location</Typography>
                    <ToggleButtonGroup
                        value={location}
                        exclusive
                        onChange={handleLocationChange}
                        aria-label="location filter"
                    >
                        <ToggleButton value="all" aria-label="all locations">All</ToggleButton>
                        <ToggleButton value="Remote" aria-label="remote">Remote</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>
        </Paper>
    );
};

export default FilterControls;