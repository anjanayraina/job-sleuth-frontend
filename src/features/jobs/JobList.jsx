import React, { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import JobCard from "../../components/JobCard";
import {
    Container,
    Grid,
    TextField,
    Typography,
    Box,
    AppBar,
    Toolbar,
    Button,
    Pagination,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { WorkOutline } from '@mui/icons-material';

// Expanded mock data to 20 jobs to better demonstrate pagination.
const mockJobs = [
    { id: "1", title: "Senior React Developer", company: "Innovatech Solutions", platform: "Discord", location: "Remote", tags: ["React", "TypeScript", "Node.js"], url: "https://example.com" },
    { id: "2", title: "Solidity Engineer (DeFi)", company: "CryptoVerse", platform: "Telegram", location: "New York, NY", tags: ["Solidity", "Blockchain", "EVM"], url: "https://example.com" },
    { id: "3", title: "Full-Stack Engineer", company: "DataStream", platform: "Discord", location: "San Francisco, CA", tags: ["Python", "Django", "React"], url: "https://example.com" },
    { id: "4", title: "UX/UI Designer", company: "Creative Minds", platform: "Telegram", location: "Remote", tags: ["Figma", "User Research"], url: "https://example.com" },
    { id: "5", title: "DevOps Specialist", company: "CloudNine", platform: "Discord", location: "Austin, TX", tags: ["Kubernetes", "Docker", "CI/CD"], url: "https://example.com" },
    { id: "6", title: "Junior Frontend Developer", company: "WebCrafters Inc.", platform: "Telegram", location: "Remote", tags: ["HTML", "CSS", "JavaScript"], url: "https://example.com" },
    { id: "7", title: "Backend Engineer (Go)", company: "ScaleFast", platform: "Discord", location: "Remote", tags: ["Go", "Microservices", "gRPC"], url: "https://example.com" },
    { id: "8", title: "Data Analyst", company: "Insightful", platform: "Telegram", location: "Boston, MA", tags: ["SQL", "Tableau", "Python"], url: "https://example.com" },
    { id: "9", title: "Mobile Engineer (React Native)", company: "AppWorks", platform: "Discord", location: "Remote", tags: ["React Native", "iOS", "Android"], url: "https://example.com" },
    { id: "10", title: "Marketing Manager", company: "GrowthHackers", platform: "Telegram", location: "London, UK", tags: ["SEO", "Content Marketing"], url: "https://example.com" },
    { id: "11", title: "Cybersecurity Analyst", company: "SecureNet", platform: "Discord", location: "Washington D.C.", tags: ["Security", "Penetration Testing"], url: "https://example.com" },
    { id: "12", title: "Project Manager", company: "Leadway", platform: "Telegram", location: "Remote", tags: ["Agile", "Scrum", "JIRA"], url: "https://example.com" },
    { id: "13", title: "Lead Game Developer", company: "PixelPlay", platform: "Discord", location: "Los Angeles, CA", tags: ["Unity", "C#", "Game Design"], url: "https://example.com" },
    { id: "14", title: "AI/ML Engineer", company: "FutureAI", platform: "Telegram", location: "Remote", tags: ["Python", "TensorFlow", "PyTorch"], url: "https://example.com" },
    { id: "15", title: "Cloud Architect", company: "InfraCloud", platform: "Discord", location: "Seattle, WA", tags: ["AWS", "Azure", "GCP"], url: "https://example.com" },
    { id: "16", title: "Technical Writer", company: "DocuGen", platform: "Telegram", location: "Remote", tags: ["Documentation", "API", "Markdown"], url: "https://example.com" },
    { id: "17", title: "QA Automation Engineer", company: "TestRight", platform: "Discord", location: "Remote", tags: ["Selenium", "Cypress", "Testing"], url: "https://example.com" },
    { id: "18", title: "Product Owner", company: "Visionary Products", platform: "Telegram", location: "Remote", tags: ["Agile", "Product Strategy"], url: "https://example.com" },
    { id: "19", title: "Blockchain Developer", company: "Ledger Group", platform: "Discord", location: "Remote", tags: ["Rust", "Solana", "Web3"], url: "https://example.com" },
    { id: "20", title: "Database Administrator", company: "DataFortress", platform: "Telegram", location: "Dallas, TX", tags: ["SQL", "PostgreSQL", "MongoDB"], url: "https://example.com" }
];


export default function JobList() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    // Changed the default jobs per page to 10
    const [jobsPerPage, setJobsPerPage] = useState(10);

    const filteredJobs = mockJobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );

    // Pagination Logic
    const indexOfLastJob = page * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleJobsPerPageChange = (event) => {
        setJobsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset to the first page
    };

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
                    {currentJobs.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography sx={{ textAlign: 'center', color: 'text.secondary', my: 5 }}>
                                No jobs found. Try a different search term!
                            </Typography>
                        </Grid>
                    ) : (
                        currentJobs.map((job) => (
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

                {/* Pagination and Jobs Per Page Controls */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5, p: 2, flexWrap: 'wrap', gap: 2 }}>
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                    />
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="jobs-per-page-label">Jobs per page</InputLabel>
                        <Select
                            labelId="jobs-per-page-label"
                            id="jobs-per-page-select"
                            value={jobsPerPage}
                            label="Jobs per page"
                            onChange={handleJobsPerPageChange}
                            variant="outlined"

                        >
                            {/* Updated the options as requested */}
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={200}>200</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Container>
        </Box>
    );
}