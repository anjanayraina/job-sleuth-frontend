import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import JobCard from "../components/JobCard";

const jobs = [
  {
    title: "Solidity Developer",
    company: "Uniswap",
    platform: "Telegram",
    channel: "@uniswap_jobs",
    time: "2h ago",
    tags: ["Solidity", "Remote", "DeFi"],
    link: "https://t.me/uniswap_jobs/123"
  },
  {
    title: "UI/UX Designer",
    company: "Meta DAO",
    platform: "Discord",
    channel: "#meta-jobs",
    time: "4h ago",
    tags: ["Design", "Remote", "Web3"],
    link: "https://discord.com/channels/..."
  },
  {
    title: "Fullstack Engineer",
    company: "NFT Market",
    platform: "Telegram",
    channel: "@nftmarket_jobs",
    time: "6h ago",
    tags: ["Node.js", "Frontend", "Remote"],
    link: "https://t.me/nftmarket_jobs/987"
  }
];

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)" }}>
      {/* Hero Section */}
      <Box sx={{ py: 8, bgcolor: "white", textAlign: "center", boxShadow: 2 }}>
        <Typography variant="h2" component="h1" fontWeight={900} color="primary" gutterBottom>
          Discover Hidden Jobs on Telegram & Discord
        </Typography>
        <Typography variant="h5" color="text.secondary" mb={3}>
          The fastest way to find exclusive jobs shared in chat groups. Search, filter, and apply in seconds!
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          sx={{ px: 5, py: 1.5, fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Browse Live Jobs
        </Button>
      </Box>

      {/* Jobs Grid */}
      <Container sx={{ mt: 8, mb: 10 }}>
        <Typography variant="h4" color="primary" fontWeight={700} mb={4} align="center">
          Latest Jobs Feed
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {jobs.map((job, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <JobCard
                {...job}
                onView={() => window.open(job.link, "_blank")}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Box sx={{ py: 5, bgcolor: "#f4f4f5", textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} JobSleuth · Made with 💙 for builders
        </Typography>
      </Box>
    </Box>
  );
}
