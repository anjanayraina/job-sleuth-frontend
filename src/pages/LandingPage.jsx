import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button, Container, Grid, Box } from "@mui/material";
import Header from "../components/Header";
import JobCard from "../components/JobCard";

// Mock data for the "Latest Jobs" section
const latestJobs = [
    { id: "1", title: "Senior React Developer", company: "Innovatech Solutions", platform: "Discord", location: "Remote", tags: ["React", "TypeScript", "Node.js"], url: "https://example.com" },
    { id: "2", title: "Solidity Engineer (DeFi)", company: "CryptoVerse", platform: "Telegram", location: "New York, NY", tags: ["Solidity", "Blockchain", "EVM"], url: "https://example.com" },
    { id: "3", title: "Full-Stack Engineer", company: "DataStream", platform: "Discord", location: "San Francisco, CA", tags: ["Python", "Django", "React"], url: "https://example.com" },
    { id: "4", title: "UX/UI Designer", company: "Creative Minds", platform: "Telegram", location: "Remote", tags: ["Figma", "User Research"], url: "https://example.com" },
    { id: "5", title: "DevOps Specialist", company: "CloudNine", platform: "Discord", location: "Austin, TX", tags: ["Kubernetes", "Docker", "CI/CD"], url: "https://example.com" },
    { id: "6", title: "Junior Frontend Developer", company: "WebCrafters Inc.", platform: "Telegram", location: "Remote", tags: ["HTML", "CSS", "JavaScript"], url: "https://example.com" },
];

const LandingPage = () => {

    const handleViewJob = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        // The main background color is now a light blue
        <Box sx={{ backgroundColor: '#e3f2fd', minHeight: '100vh' }}>
            <Header />

            <Container maxWidth="lg">
                {/* --- Hero Section --- */}
                <Box
                    sx={{
                        position: 'relative',
                        color: 'white',
                        py: { xs: 8, md: 14 },
                        my: 4,
                        borderRadius: 3,
                        overflow: 'hidden',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // Using a darker blue gradient for the hero to stand out
                        background: 'linear-gradient(45deg, #1976D2 30%, #21CBF3 90%)',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                    }}
                >
                    <Typography variant="h2" component="h1" fontWeight="700" gutterBottom>
                        Find Hidden Jobs from Telegram & Discord
                    </Typography>
                    <Typography variant="h6" component="p" sx={{ mb: 3, color: 'grey.200' }}>
                        The fastest way to discover exclusive jobs shared in fast-moving chat groups.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        component={RouterLink}
                        to="/jobs"
                        color="primary"
                        sx={{
                            // A subtle style for the button to make it pop
                            backgroundColor: 'white',
                            color: 'primary.main',
                            '&:hover': { backgroundColor: 'grey.200' }
                        }}
                    >
                        Browse Live Jobs
                    </Button>
                </Box>

                {/* --- Latest Jobs Section --- */}
                <Box sx={{ py: 6 }}>
                    <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'primary.dark' }}>
                        Latest Jobs
                    </Typography>
                    <Grid container spacing={4}>
                        {latestJobs.map((job) => (
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
                        ))}
                    </Grid>
                </Box>
            </Container>

            <Box component="footer" sx={{ py: 3, textAlign: 'center', color: 'primary.dark', mt: 'auto' }}>
                <Typography variant="body2">
                    © 2024 JobSleuth. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;