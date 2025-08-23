import React from 'react';
import { Box, TextField, Paper, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const FilterControls = ({ search, setSearch, platform, setPlatform, location, setLocation }) => {
    return (
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <TextField
                fullWidth
                label="Search by title, company, or keyword..."
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
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Platform</Typography>
                    <ToggleButtonGroup
                        value={platform}
                        exclusive
                        onChange={(e, newPlatform) => setPlatform(newPlatform)}
                        aria-label="platform filter"
                    >
                        <ToggleButton value="all" aria-label="all platforms">All</ToggleButton>
                        <ToggleButton value="telegram" aria-label="telegram">Telegram</ToggleButton>
                        <ToggleButton value="linkedin" aria-label="linkedin">Linkedin</ToggleButton>
                        <ToggleButton value="discord" aria-label="discord">Discord</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Location</Typography>
                    <ToggleButtonGroup
                        value={location}
                        exclusive
                        onChange={(e, newLocation) => setLocation(newLocation)}
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