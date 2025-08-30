// src/components/JobCard.jsx
import React from "react";
import { Card, Typography, Chip, Stack, Box, IconButton, Avatar } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

// Helper to get a consistent color for each source
const getSourceAvatarProps = (source) => {
    const s = source?.toLowerCase() || 'default';
    let color = '#757575'; // default grey
    let char = s.charAt(0).toUpperCase();

    if (s.includes('telegram')) { color = '#29b6f6'; char = 'T'; }
    else if (s.includes('discord')) { color = '#7e57c2'; char = 'D'; }
    else if (s.includes('linkedin')) { color = '#0277bd'; char = 'L'; }
    else if (s.includes('remote')) { color = '#ff7043'; char = 'R'; }

    return {
        sx: {
            bgcolor: color,
            width: 80,
            height: 80,
            fontSize: '2.5rem',
            borderRadius: 1.5,
            flexShrink: 0
        },
        children: char,
    };
};

export default function JobCard({ job, onView, isLiked, isSaved, onToggleLike, onToggleSave, showActions = true }) {
    if (!job) return null;

    const { title, company, tags, _id, source } = job;

    const handleLikeClick = (e) => {
        e.stopPropagation();
        onToggleLike(_id);
    };

    const handleSaveClick = (e) => {
        e.stopPropagation();
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
            {/* --- DYNAMIC SOURCE AVATAR --- */}
            <Avatar variant="rounded" {...getSourceAvatarProps(source)} />

            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="h6" fontWeight={600} noWrap title={title}>{title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{company}</Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                    {tags && tags.slice(0, 3).map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                </Stack>
            </Box>

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
