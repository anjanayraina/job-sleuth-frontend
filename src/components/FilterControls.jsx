// src/components/FilterControls.jsx
import React from 'react';
import {
    Box, Paper, Typography, Divider, FormGroup, FormControlLabel, Checkbox,
    ToggleButtonGroup, ToggleButton, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, Radio
} from '@mui/material';

const FilterControls = ({ filters, setFilters }) => {

    const handleFilterChange = (group, exclusive = false) => (event, newValue) => {
        const value = event.target.value;
        setFilters(prev => {
            if (exclusive) {
                return { ...prev, [group]: newValue !== null ? newValue : prev[group] };
            }
            const newGroupValues = prev[group].includes(value)
                ? prev[group].filter(item => item !== value)
                : [...prev[group], value];
            return { ...prev, [group]: newGroupValues };
        });
    };

    const clearFilters = () => {
        setFilters({
            jobType: [],
            experience: 'any',
            salary: [],
            currency: 'lpa',
            domain: ''
        });
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
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={handleFilterChange('jobType')} value="Full Time" />} label="Full Time" />
                    <FormControlLabel control={<Checkbox onChange={handleFilterChange('jobType')} value="Part Time" />} label="Part Time" />
                    <FormControlLabel control={<Checkbox onChange={handleFilterChange('jobType')} value="Internship" />} label="Internship" />
                    <FormControlLabel control={<Checkbox onChange={handleFilterChange('jobType')} value="Freelance" />} label="Freelance" />
                </FormGroup>
            </Box>
            <Divider />

            {/* Experience Level */}
            <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Experience Level</Typography>
                <FormControl>
                    <RadioGroup
                        value={filters.experience}
                        onChange={(e) => setFilters(prev => ({...prev, experience: e.target.value}))}
                    >
                        <FormControlLabel value="any" control={<Radio />} label="Any" />
                        <FormControlLabel value="entry" control={<Radio />} label="Entry-Level (0-2 yrs)" />
                        <FormControlLabel value="mid" control={<Radio />} label="Mid-Level (3-5 yrs)" />
                        <FormControlLabel value="senior" control={<Radio />} label="Senior (5+ yrs)" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Divider />

            {/* Salary */}
            <Box sx={{ my: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Salary</Typography>
                    <ToggleButtonGroup
                        value={filters.currency}
                        exclusive
                        size="small"
                        onChange={(e, newCurrency) => setFilters(prev => ({ ...prev, currency: newCurrency || 'lpa' }))}
                    >
                        <ToggleButton value="lpa">₹ LPA</ToggleButton>
                        <ToggleButton value="usd">$ USD</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={handleFilterChange('salary')} value="0-50" />} label="< 50k" />
                    <FormControlLabel control={<Checkbox onChange={handleFilterChange('salary')} value="50-100" />} label="50k - 100k" />
                    <FormControlLabel control={<Checkbox onChange={handleFilterChange('salary')} value="100-200" />} label="100k - 200k" />
                    <FormControlLabel control={<Checkbox onChange={handleFilterChange('salary')} value="200+" />} label="200k+" />
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
                        <MenuItem value=""><em>Any</em></MenuItem>
                        <MenuItem value="engineering">Software Engineering</MenuItem>
                        <MenuItem value="design">Design & UX</MenuItem>
                        <MenuItem value="product">Product Management</MenuItem>
                        <MenuItem value="data">Data Science</MenuItem>
                        <MenuItem value="marketing">Marketing</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Paper>
    );
};

export default FilterControls;