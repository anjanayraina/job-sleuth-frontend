import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import JobCard from "../../components/JobCard";
import JobDetailModal from "../../components/JobDetailModal";
import FilterControls from "../../components/FilterControls";
import { jobService } from "../../services/jobService";
import {
  Container, Grid, Typography, Box, Pagination,
  FormControl, InputLabel, Select, MenuItem,
  CircularProgress, Alert
} from "@mui/material";

export default function JobList() {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState('all');
  const [location, setLocation] = useState('all');

  // State for pagination
  const [page, setPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(9);

  // State for modal
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await jobService.getJobs();
        setAllJobs(data);
      } catch (err) {
        setError("Failed to fetch jobs. Please ensure the backend server is running.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getJobs();
  }, []);

  // Memoized filtering logic
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const searchTermMatch = search === '' ||
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase()) ||
          (job.tags && job.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())));

      const platformMatch = platform === 'all' || (job.source && job.source.toLowerCase() === platform);

      const locationMatch = location === 'all' || (job.location && job.location.toLowerCase().includes(location.toLowerCase()));

      return searchTermMatch && platformMatch && locationMatch;
    });
  }, [allJobs, search, platform, location]);

  // Pagination logic
  const currentJobs = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);
  const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
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

          <FilterControls
              search={search}
              setSearch={setSearch}
              platform={platform}
              setPlatform={setPlatform}
              location={location}
              setLocation={setLocation}
          />

          {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress size={60} /></Box>
          ) : error ? (
              <Alert severity="error" sx={{ my: 5 }}>{error}</Alert>
          ) : (
              <>
                <Grid container spacing={3}>
                  {currentJobs.length === 0 ? (
                      <Grid item xs={12}>
                        <Typography sx={{ textAlign: 'center', color: 'text.secondary', my: 5, fontStyle: 'italic' }}>
                          No jobs match your current filters. Try a different search!
                        </Typography>
                      </Grid>
                  ) : (
                      currentJobs.map((job) => (
                          <Grid item key={job.job_hash} xs={12} sm={6} md={4}>
                            <JobCard job={job} onView={() => handleOpenModal(job)} />
                          </Grid>
                      ))
                  )}
                </Grid>

                {filteredJobs.length > jobsPerPage &&
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                      <Pagination
                          count={pageCount}
                          page={page}
                          onChange={(e, value) => setPage(value)}
                          color="primary"
                          size="large"
                      />
                    </Box>
                }
              </>
          )}
        </Container>

        <JobDetailModal
            job={selectedJob}
            open={isModalOpen}
            onClose={handleCloseModal}
        />
      </Box>
  );
}