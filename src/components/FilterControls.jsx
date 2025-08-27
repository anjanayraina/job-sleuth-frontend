// src/components/FilterControls.jsx
import React from 'react';
import {
    Box, Paper, Typography, Divider, FormGroup, FormControlLabel, Checkbox,
    ToggleButtonGroup, ToggleButton, Button, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

const FilterControls = ({ filters, setFilters }) => {

    const handleJobTypeChange = (event, newJobType) => {
        if (newJobType !== null) {
            setFilters(prev => ({ ...prev, jobType: newJobType }));
        }
    };

    const handleCheckboxChange = (group) => (event) => {
        setFilters(prev => {
            const newGroupValues = prev[group].includes(event.target.name)
                ? prev[group].filter(item => item !== event.target.name)
                : [...prev[group], event.target.name];
            return { ...prev, [group]: newGroupValues };
        });
    };

    const clearFilters = () => {
        setFilters({ jobType: 'Full Time', experience: [], salary: [], domain: '' });
    };

    return (
        <Paper elevation={0} variant="outlined" sx={{ p: 2, position: 'sticky', top: '20px', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">Filters</Typography>
                <Button size="small" onClick={clearFilters}>Clear All</Button>
            </Box>
            <Divider />

            {/* Job Type */}
            <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Job Type</Typography>
                <ToggleButtonGroup
                    value={filters.jobType}
                    exclusive
                    onChange={handleJobTypeChange}
                    fullWidth
                    size="small"
                >
                    <ToggleButton value="Full Time">Full Time</ToggleButton>
                    <ToggleButton value="Internship">Internship</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Divider />

            {/* Experience */}
            <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Experience</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={handleCheckboxChange('experience')} name="0" />} label="More than 0 year" />
                    <FormControlLabel control={<Checkbox onChange={handleCheckboxChange('experience')} name="1" />} label="More than 1 year" />
                    <FormControlLabel control={<Checkbox onChange={handleCheckboxChange('experience')} name="2" />} label="More than 2 years" />
                </FormGroup>
            </Box>
            <Divider />

            {/* Salary */}
            <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Salary</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={handleCheckboxChange('salary')} name="0-4" />} label="0-4 LPA" />
                    <FormControlLabel control={<Checkbox onChange={handleCheckboxChange('salary')} name="4-10" />} label="4-10 LPA" />
                    <FormControlLabel control={<Checkbox onChange={handleCheckboxChange('salary')} name="10-20" />} label="10-20 LPA" />
                </FormGroup>
            </Box>
            <Divider />

            {/* Domain */}
            <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Domain</Typography>
                <FormControl fullWidth size="small">
                    <InputLabel>Select Domain</InputLabel>
                    <Select
                        value={filters.domain}
                        label="Select Domain"
                        onChange={(e) => setFilters(prev => ({...prev, domain: e.target.value}))}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="engineering">Engineering</MenuItem>
                        <MenuItem value="design">Design</MenuItem>
                        <MenuItem value="product">Product</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Paper>
    );
};

export default FilterControls;