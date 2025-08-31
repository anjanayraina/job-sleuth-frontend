import React, { useState } from 'react';
import { Box, Container, Typography, Paper, TextField, Button, Stack, CircularProgress, Alert, Avatar } from '@mui/material';
import Header from '../components/Header';
import { userService } from '../services/userService';
import SearchIcon from '@mui/icons-material/Search';

const UserSearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        setError('');
        try {
            const data = await userService.searchUsers(query);
            setResults(data);
        } catch (err) {
            setError('Failed to search for users.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Paper sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                        Find a User
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
                        <TextField
                            fullWidth
                            label="Search by username or email"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button variant="contained" onClick={handleSearch} disabled={loading} startIcon={<SearchIcon />}>
                            Search
                        </Button>
                    </Stack>

                    {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
                    {error && <Alert severity="error">{error}</Alert>}

                    <Stack spacing={2}>
                        {results.map(user => (
                            <Paper key={user.id} variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
                                <Box>
                                    <Typography fontWeight="bold">{user.username}</Typography>
                                    <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                                </Box>
                            </Paper>
                        ))}
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default UserSearchPage;