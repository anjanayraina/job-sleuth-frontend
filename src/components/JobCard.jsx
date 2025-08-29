import React from "react";
import { Card, Typography, Chip, Stack, Box, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

// The new 'showActions' prop defaults to true
export default function JobCard({ job, onView, isLiked, isSaved, onToggleLike, onToggleSave, showActions = true }) {
    if (!job) return null;

    // Use job._id for consistency across the app
    const { title, company, tags, _id } = job;

    const handleLikeClick = (e) => {
        e.stopPropagation(); // Prevents the card's onView from firing
        onToggleLike(_id);
    };

    const handleSaveClick = (e) => {
        e.stopPropagation(); // Prevents the card's onView from firing
        onToggleSave(_id);
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

            {/* Action buttons are now rendered conditionally based on the showActions prop */}
            {showActions && (
                <Stack direction="column">
                    <IconButton onClick={handleLikeClick} color="error">
                        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton onClick={handleSaveClick} color="primary">
                        {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </Stack>
            )}
        </Card>
    );
}