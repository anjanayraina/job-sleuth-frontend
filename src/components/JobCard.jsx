import React from "react";
import { Card, Typography, Chip, Stack, Box, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export default function JobCard({ job, onView, isLiked, isSaved, onToggleLike, onToggleSave }) {
    if (!job) return null;

    // --- FIX: Use `id` which is sent from the backend ---
    const { title, company, tags, id } = job;

    const handleLikeClick = (e) => {
        e.stopPropagation();
        // --- FIX: Pass the correct `id` ---
        onToggleLike(id);
    };

    const handleSaveClick = (e) => {
        e.stopPropagation();
        // --- FIX: Pass the correct `id` ---
        onToggleSave(id);
    };

    return (
        <Card
            onClick={onView}
            sx={{
                p: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2,
                cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 3 }
            }}
        >
            <Box component="img" sx={{ width: 80, height: 80, borderRadius: 1.5, objectFit: 'cover', flexShrink: 0 }}
                 src={`https://picsum.photos/seed/${company}/200`} alt={`${company} logo`} />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="h6" fontWeight={600} noWrap title={title}>{title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{company}</Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                    {tags && tags.slice(0, 3).map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                </Stack>
            </Box>
            <Stack direction="column">
                <IconButton onClick={handleLikeClick} color="error">
                    {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton onClick={handleSaveClick} color="primary">
                    {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
            </Stack>
        </Card>
    );
}