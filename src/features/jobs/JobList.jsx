
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import JobCard from "../../components/JobCard";
import { jobService } from "../../services/jobService"; // Use the new service
import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert
} from "@mui/material";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);

  // This useEffect hook runs when the component mounts and when the 'search' term changes.
  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the jobService to fetch jobs from your backend API
        const data = await jobService.getJobs({ tags: search }); 
        
        setJobs(data);
      } catch (err) {
        // Set an error message if the API call fails
        setError("Failed to fetch jobs. Please ensure the backend server is running.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Use a timer to prevent sending an API request on every single keystroke
    const debounceTimer = setTimeout(() => {
      getJobs();
    }, 500); // Wait 500ms after the user stops typing

    // Cleanup function to clear the timer
    return () => clearTimeout(debounceTimer);
  }, [search]); // The effect re-runs whenever the 'search' state changes

  // --- Pagination Logic ---
  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const pageCount = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleJobsPerPageChange = (event) => {
    setJobsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page
  };
  
  // Helper function to extract a URL from markdown link format, e.g., [text](url)
  const getJobUrl = (description) => {
      if (!description) return null;
      const match = description.match(/\[.*?\]\((.*?)\)/);
      return match ? match[1] : null;
  }

  const handleViewJob = (job) => {
    const url = job.link || getJobUrl(job.description);
    if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
    } else {
        alert("No direct application link found for this job.");
    }
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Header />

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
          sx={{ mb: 4, backgroundColor: 'background.paper' }}
        />
        
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                <CircularProgress size={60} />
            </Box>
        ) : error ? (
            <Alert severity="error" sx={{ my: 5 }}>{error}</Alert>
        ) : (
          <>
            <Grid container spacing={4}>
              {currentJobs.length === 0 ? (
                <Grid item xs={12}>
                  <Typography sx={{ textAlign: 'center', color: 'text.secondary', my: 5 }}>
                    No jobs found. Try a different search!
                  </Typography>
                </Grid>
              ) : (
                currentJobs.map((job) => (
                  <Grid item key={job.job_hash || job.id} xs={12} sm={6} md={4}>
                    <JobCard
                      title={job.title}
                      company={job.company}
                      platform={job.source || 'web'}
                      channel={job.location || 'Remote'}
                      time={new Date(job.date_posted).toLocaleDateString()}
                      tags={job.tags || []}
                      onView={() => handleViewJob(job)}
                    />
                  </Grid>
                ))
              )}
            </Grid>

            {jobs.length > 0 &&
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5, p: 2, flexWrap: 'wrap', gap: 2 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel>Jobs per page</InputLabel>
                  <Select
                    value={jobsPerPage}
                    label="Jobs per page"
                    onChange={handleJobsPerPageChange}
                    variant="outlined"
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            }
          </>
        )}
      </Container>
    </Box>
  );
}