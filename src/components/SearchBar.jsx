// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { Paper, TextField, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
    const [searchTerms, setSearchTerms] = useState({
        keywords: '',
        location: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSearchTerms(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        onSearch(searchTerms);
    };

    return (
        <Paper sx={{ p: 2, mb: 4, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        name="keywords"
                        label="Job title, keywords, or company"
                        variant="outlined"
                        value={searchTerms.keywords}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        name="location"
                        label="City, state, or remote"
                        variant="outlined"
                        value={searchTerms.location}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<SearchIcon />}
                        onClick={handleSearch}
                        sx={{ height: '56px' }} // Match TextField height
                    >
                        Find Jobs
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SearchBar;