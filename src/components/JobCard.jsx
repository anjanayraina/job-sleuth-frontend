// src/components/JobCard.jsx
import React from "react";
import { Card, Typography, Chip, Stack, Box, IconButton, Avatar } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import ForumIcon from '@mui/icons-material/Forum';
import RedditIcon from '@mui/icons-material/Reddit'; // Import the Reddit icon

const getSourceAvatarProps = (source) => {
    const s = source?.toLowerCase() || 'default';
    let color = '#757575'; // A default grey color
    let icon = <LanguageIcon sx={{ fontSize: '2.5rem' }} />; // Default to a "web" icon

    if (s.includes('telegram')) {
        color = '#29b6f6'; // Telegram's brand blue
        icon = <TelegramIcon sx={{ fontSize: '2.5rem' }} />;
    } else if (s.includes('discord')) {
        color = '#7e57c2'; // Discord's "blurple" color
        icon = <ForumIcon sx={{ fontSize: '2.5rem' }} />; // Using a forum/chat icon
    } else if (s.includes('linkedin')) {
        color = '#0277bd'; // LinkedIn's brand blue
        icon = <LinkedInIcon sx={{ fontSize: '2.5rem' }} />;
    } else if (s.includes('remote')) {
        color = '#ff7043'; // A distinct orange for remote job boards
        icon = <LanguageIcon sx={{ fontSize: '2.5rem' }} />;
    } else if (s.includes('reddit')) {
        color = '#FF4500'; // Reddit's brand orange-red
        icon = <RedditIcon sx={{ fontSize: '2.5rem' }} />;
    }


    return {
        sx: {
            bgcolor: color,
            width: 80,
            height: 80,
            borderRadius: 1.5,
            flexShrink: 0,
            color: 'white', // Ensure the icon is white
        },
        children: icon,
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
            {/* The Avatar now renders our new, beautiful icon */}
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