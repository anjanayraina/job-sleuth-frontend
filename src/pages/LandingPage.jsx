import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";
import { WorkOutline } from "@mui/icons-material";

// Mock data, same as before. We'll replace this with a real API call later.
const jobs = [
  {
    title: "Senior Solidity Engineer",
    company: "BlockChain Co.",
    platform: "Telegram",
    image: "https://source.unsplash.com/random/300x300?blockchain",
  },
  {
    title: "Frontend Developer",
    company: "WebCrafters Inc.",
    platform: "Discord",
    image: "https://source.unsplash.com/random/300x300?frontend",
  },
  {
    title: "Product Manager",
    company: "Innovate Solutions",
    platform: "Telegram",
    image: "https://source.unsplash.com/random/300x300?product",
  },
  {
    title: "Data Scientist",
    company: "Data Insights Corp.",
    platform: "Discord",
    image: "https://source.unsplash.com/random/300x300?data",
  },
  {
    title: "UX Designer",
    company: "User Experience Studio",
    platform: "Telegram",
    image: "https://source.unsplash.com/random/300x300?ux",
  },
  {
    title: "DevOps Engineer",
    company: "CloudOps Ltd.",
    platform: "Discord",
    image: "https://source.unsplash.com/random/300x300?devops",
  },
];

const LandingPage = () => {
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
              <Button color="inherit">Home</Button>
              <Button color="inherit">About</Button>
              <Button color="inherit">Contact</Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box
              sx={{
                textAlign: 'center',
                color: 'white',
                py: 12,
                my: 4,
                borderRadius: 3,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              }}
          >
            <Typography variant="h2" component="h1" fontWeight="700" gutterBottom>
              Find Hidden Jobs from Telegram & Discord
            </Typography>
            <Typography variant="h6" component="p" sx={{ mb: 3, color: 'grey.200' }}>
              The fastest way to discover exclusive jobs shared in fast-moving chat groups.
            </Typography>
            <Button variant="contained" size="large" color="primary" sx={{
              fontWeight: 'bold',
              py: 1.5,
              px: 4,
              backgroundColor: 'white',
              color: '#2196F3',
              '&:hover': {
                backgroundColor: 'grey.100',
              }
            }}>
              Browse Live Jobs
            </Button>
          </Box>

          {/* Latest Jobs Section */}
          <Box sx={{ py: 6 }}>
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
              Latest Jobs
            </Typography>
            <Grid container spacing={4}>
              {jobs.map((job, idx) => (
                  <Grid item key={idx} xs={12} sm={6} md={4}>
                    <Card sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                      },
                    }}>
                      <CardMedia
                          component="img"
                          height="160"
                          image={job.image}
                          alt={job.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {job.company}
                        </Typography>
                        <Box
                            sx={{
                              display: 'inline-block',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              backgroundColor: job.platform.toLowerCase() === 'telegram' ? '#e3f2fd' : '#ede7f6',
                              color: job.platform.toLowerCase() === 'telegram' ? '#0d47a1' : '#5e35b1',
                            }}
                        >
                          {job.platform}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
        {/* Footer */}
        <Box component="footer" sx={{ py: 3, textAlign: 'center', color: 'grey.600', mt: 'auto' }}>
          <Typography variant="body2">
            © 2024 JobSleuth. All rights reserved.
          </Typography>
        </Box>
      </Box>
  );
};

export default LandingPage;