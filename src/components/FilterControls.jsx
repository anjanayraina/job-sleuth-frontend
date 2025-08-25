import React from 'react';
import { Box, TextField, Paper, Typography, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const FilterControls = ({ filters, setFilters }) => {
    const handlePlatformChange = (event, newPlatform) => {
        if (newPlatform !== null) {
            setFilters(prev => ({ ...prev, platform: newPlatform }));
        }
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
        setFilters({ search: '', platform: 'all', location: 'all' });
    };

    return (
        <Paper elevation={0} variant="outlined" sx={{ p: 2, position: 'sticky', top: '20px', borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Filters</Typography>
            <TextField
                fullWidth
                placeholder="Search..."
                variant="outlined"
                size="small"
                value={filters.search}
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                }}
                sx={{ mb: 2 }}
            />
            <Box>
                <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 'bold' }}>Platform</Typography>
                <ToggleButtonGroup value={filters.platform} exclusive onChange={handlePlatformChange} aria-label="platform">
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="telegram">Telegram</ToggleButton>
                    <ToggleButton value="discord">Discord</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box>
                <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>Location</Typography>
                <ToggleButtonGroup value={filters.location} exclusive onChange={handleLocationChange} aria-label="location">
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="Remote">Remote</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Button onClick={clearFilters} fullWidth sx={{ mt: 2 }}>Clear All</Button>
        </Paper>
    );
};

export default FilterControls;