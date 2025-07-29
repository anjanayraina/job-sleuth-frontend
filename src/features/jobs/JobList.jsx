import React, { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import JobCard from "../../components/JobCard";
import { Container, Grid, TextField, Typography, Box, AppBar, Toolbar, Button } from "@mui/material";
import { WorkOutline } from '@mui/icons-material';

// Mock data remains the same...
const mockJobs = [
    {
        id: "1",
        title: "Senior React Developer",
        company: "Innovatech Solutions",
        platform: "Discord",
        location: "Remote",
        tags: ["React", "TypeScript", "Node.js", "GraphQL"],
        url: "https://example.com",
    },
    {
        id: "2",
        title: "Solidity Engineer (DeFi)",
        company: "CryptoVerse",
        platform: "Telegram",
        location: "New York, NY",
        tags: ["Solidity", "Blockchain", "EVM", "Hardhat"],
        url: "https://example.com",
    },
    {
        id: "3",
        title: "Full-Stack Engineer",
        company: "DataStream",
        platform: "Discord",
        location: "San Francisco, CA",
        tags: ["Python", "Django", "React", "AWS"],
        url: "https://example.com",
    },
    {
        id: "4",
        title: "UX/UI Designer",
        company: "Creative Minds",
        platform: "Telegram",
        location: "Remote",
        tags: ["Figma", "User Research", "Prototyping"],
        url: "https://example.com",
    },
    {
        id: "5",
        title: "DevOps Specialist",
        company: "CloudNine",
        platform: "Discord",
        location: "Austin, TX",
        tags: ["Kubernetes", "Docker", "CI/CD", "Terraform"],
        url: "https://example.com",
    },
    {
        id: "6",
        title: "Junior Frontend Developer",
        company: "WebCrafters Inc.",
        platform: "Telegram",
        location: "Remote",
        tags: ["HTML", "CSS", "JavaScript", "React"],
        url: "https://example.com",
    },
];

export default function JobList() {
    const [search, setSearch] = useState("");

    const filteredJobs = mockJobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );

    const handleViewJob = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <Box sx={{ backgroundColor: 'grey.50', minHeight: '100vh' }}>
            {/* Header */}
            <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <WorkOutline sx={{ mr: 1.5 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        JobSleuth
                    </Typography>
                    <Box>
                        <Button color="inherit" component={RouterLink} to="/">Home</Button>
                        <Button color="inherit" component={RouterLink} to="/about">About</Button>
                        <Button color="inherit" component={RouterLink} to="/contact">Contact</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Discover Your Next Opportunity
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Search our collection of jobs from across the web.
                    </Typography>
                </Box>

                <TextField
                    fullWidth
                    label="Search by title, company, or tag..."
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ mb: 4, backgroundColor: 'white' }}
                />

                <Grid container spacing={4}>
                    {filteredJobs.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography sx={{ textAlign: 'center', color: 'text.secondary', my: 5 }}>
                                No jobs found. Try a different search term!
                            </Typography>
                        </Grid>
                    ) : (
                        filteredJobs.map((job) => (
                            <Grid item key={job.id} xs={12} sm={6} md={4}>
                                <JobCard
                                    title={job.title}
                                    company={job.company}
                                    platform={job.platform}
                                    channel={job.location}
                                    time={"Posted recently"}
                                    tags={job.tags}
                                    onView={() => handleViewJob(job.url)}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </Box>
    );
}