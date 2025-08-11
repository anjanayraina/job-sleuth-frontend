import React from 'react';
import { Box, Modal, Typography, Paper, IconButton, Chip, Stack, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Helper function to extract a URL from markdown link format, e.g., [text](url)
const getJobUrl = (description) => {
    if (!description) return null;
    const match = description.match(/\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
};

const JobDetailModal = ({ job, open, onClose }) => {
    if (!job) return null;

    const jobUrl = job.link || getJobUrl(job.description);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="job-detail-title"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper sx={{
                p: 4,
                width: { xs: '90%', md: '60%' },
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                bgcolor: 'background.paper'
            }}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography id="job-detail-title" variant="h4" component="h2" fontWeight="bold" gutterBottom>
                    {job.title}
                </Typography>

                <Typography variant="h6" color="primary.dark" gutterBottom>
                    {job.company}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                    {job.location || 'Remote'} &bull; Source: {job.source}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                    {job.tags && job.tags.map(tag => (
                        <Chip key={tag} label={tag} size="small" />
                    ))}
                </Stack>

                <Box sx={{ my: 3 }}>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {job.description}
                    </Typography>
                </Box>

                {jobUrl && (
                    <Button
                        variant="contained"
                        href={jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<OpenInNewIcon />}
                    >
                        Apply Now
                    </Button>
                )}
            </Paper>
        </Modal>
    );
};

export default JobDetailModal;