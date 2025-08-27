// src/components/JobCard.jsx
import * as React from "react";
import {
    Container, Grid, Typography, Box, Pagination,
    CircularProgress, Alert, Stack, Card, Chip, Button // <--- ADD Stack HERE
} from "@mui/material";
export default function JobCard({ job, onView }) {
    if (!job) {
        return null;
    }

    const { title, company, source, location, tags } = job;

    return (
        <Card
            onClick={onView}
            sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease-in-out',
                '&:hover': {
                    boxShadow: 3,
                }
            }}
        >
            {/* Image Placeholder */}
            <Box
                component="img"
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 1.5,
                    objectFit: 'cover',
                    flexShrink: 0
                }}
                // Using a placeholder image service. Replace with actual company logos if available.
                src={`https://picsum.photos/seed/${company}/200`}
                alt={`${company} logo`}
            />

            {/* Job Details */}
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="h6" fontWeight={600} noWrap title={title}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {company}
                </Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                    <Chip label="Full Time" size="small" variant="outlined" />
                    <Chip label="5-10 LPA" size="small" variant="outlined" />
                    <Chip label="0 years" size="small" variant="outlined" />
                </Stack>
            </Box>

            {/* Apply Button (Optional) */}
            <Button variant="contained" onClick={(e) => { e.stopPropagation(); onView(); }}>
                View
            </Button>
        </Card>
    );
}