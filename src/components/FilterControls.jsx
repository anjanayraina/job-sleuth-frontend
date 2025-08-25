import React from 'react';
import { Box, TextField, Paper, Typography, ToggleButton, ToggleButtonGroup, Button, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const FilterControls = ({ filters, setFilters }) => {
    const handlePlatformChange = (event, newPlatforms) => {
        setFilters(prev => ({ ...prev, platforms: newPlatforms }));
    };

    const handleLocationChange = (event, newLocation) => {
        if (newLocation !== null) {
            setFilters(prev => ({ ...prev, location: newLocation }));
        }
    };

    const handleSearchChange = (event) => {
        setFilters(prev => ({ ...prev, search: event.target.value }));
    };

    const clearFilters = () => {
        setFilters({ search: '', platforms: [], location: 'all' });
    };

    return (
        <Paper elevation={0} variant="outlined" sx={{ p: 2, position: 'sticky', top: '20px', borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Filters</Typography>
            <TextField
                fullWidth
                placeholder="Search by title, keyword..."
                variant="outlined"
                size="small"
                value={filters.search}
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                }}
                sx={{ mb: 2 }}
            />
            <Divider sx={{ my: 2 }} />
            <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Platform</Typography>
                <ToggleButtonGroup
                    value={filters.platforms}
                    onChange={handlePlatformChange}
                    aria-label="platform filter"
                    orientation="vertical"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    <ToggleButton value="telegram">Telegram</ToggleButton>
                    <ToggleButton value="discord">Discord</ToggleButton>
                    <ToggleButton value="linkedin">LinkedIn</ToggleButton>
                    <ToggleButton value="web">Other</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Location</Typography>
                <ToggleButtonGroup
                    value={filters.location}
                    exclusive
                    fullWidth
                    onChange={handleLocationChange}
                    aria-label="location filter"
                    sx={{ mt: 1 }}
                >
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="Remote">Remote</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Button onClick={clearFilters} fullWidth sx={{ mt: 2 }}>Clear All</Button>
        </Paper>
    );
};

export default FilterControls;