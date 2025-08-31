// src/components/FilterControls.jsx
import React from 'react';
import {
    Box, Paper, Typography, Divider, FormGroup, FormControlLabel, Checkbox,
    Button, FormControl, RadioGroup, Radio
} from '@mui/material';

const FilterControls = ({ filters, setFilters }) => {

    const handleFilterChange = (group, exclusive = false) => (event) => {
        const value = event.target.value;
        setFilters(prev => {
            if (exclusive) {
                return { ...prev, [group]: value };
            }
            const currentValues = prev[group] || [];
            const newGroupValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];
            return { ...prev, [group]: newGroupValues };
        });
    };

    const clearFilters = () => {
        setFilters(prev => ({
            ...prev,
            jobType: [],
            experience: 'any',
            salary_type: 'any',
        }));
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
                    <FormControlLabel control={<Checkbox checked={filters.jobType.includes('Full-time')} onChange={handleFilterChange('jobType')} value="Full-time" />} label="Full Time" />
                    <FormControlLabel control={<Checkbox checked={filters.jobType.includes('Part-time')} onChange={handleFilterChange('jobType')} value="Part-time" />} label="Part Time" />
                    <FormControlLabel control={<Checkbox checked={filters.jobType.includes('Contract')} onChange={handleFilterChange('jobType')} value="Contract" />} label="Contract" />
                    <FormControlLabel control={<Checkbox checked={filters.jobType.includes('Internship')} onChange={handleFilterChange('jobType')} value="Internship" />} label="Internship" />
                </FormGroup>
            </Box>
            <Divider />

            {/* Experience Level */}
            <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Experience Level</Typography>
                <FormControl>
                    <RadioGroup
                        value={filters.experience || 'any'}
                        onChange={handleFilterChange('experience', true)}
                    >
                        <FormControlLabel value="any" control={<Radio />} label="Any" />
                        <FormControlLabel value="Entry-Level" control={<Radio />} label="Entry-Level" />
                        <FormControlLabel value="Mid-Level" control={<Radio />} label="Mid-Level" />
                        <FormControlLabel value="Senior" control={<Radio />} label="Senior" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Divider />

            {/* Salary Type */}
            <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Salary Type</Typography>
                <FormControl>
                    <RadioGroup
                        value={filters.salary_type || 'any'}
                        onChange={handleFilterChange('salary_type', true)}
                    >
                        <FormControlLabel value="any" control={<Radio />} label="Any" />
                        <FormControlLabel value="yearly" control={<Radio />} label="Yearly" />
                        <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                        <FormControlLabel value="hourly" control={<Radio />} label="Hourly" />
                        <FormControlLabel value="project" control={<Radio />} label="Project-Based" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Paper>
    );
};

export default FilterControls;