import * as React from "react";
import { Card, CardHeader, CardContent, Button, Typography, Chip, Stack, Avatar, Divider, Box } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import ChatIcon from "@mui/icons-material/Chat"; // Placeholder for Discord
import LinkedInIcon from '@mui/icons-material/LinkedIn'; // 1. Import the LinkedIn Icon
import LanguageIcon from '@mui/icons-material/Language';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// 2. Add LinkedIn to our platform icons and colors
const platformIcons = {
    telegram: <TelegramIcon />,
    discord: <ChatIcon />,
    linkedin: <LinkedInIcon />,
    default: <LanguageIcon />,
};

const platformColors = {
    telegram: '#229ED9',
    discord: '#5865F2',
    linkedin: '#0A66C2', // LinkedIn's brand blue
    default: 'grey.700',
};

export default function JobCard({ job, onView }) {
    if (!job) {
        return null;
    }

    const { title, company, source, location, tags, description, link } = job;

    const getJobUrl = (desc) => {
        if (!desc) return null;
        const match = desc.match(/\[.*?\]\((.*?)\)/);
        return match ? match[1] : null;
    };

    const handleButtonClick = (e) => {
        e.stopPropagation();
        const url = link || getJobUrl(description);
        if (url) {
            window.open(url, "_blank", "noopener,noreferrer");
        } else {
            alert("No direct application link found for this job.");
        }
    };

    const platformKey = source ? source.toLowerCase() : 'default';

    return (
        <Card
            onClick={onView}
            sx={{
                borderRadius: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: (theme) => `0 18px 36px ${theme.palette.primary.main}20`,
                }
            }}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: platformColors[platformKey] || platformColors.default }}>
                        {platformIcons[platformKey] || platformIcons.default}
                    </Avatar>
                }
                title={<Typography variant="h6" fontWeight={600} noWrap title={title}>{title}</Typography>}
                subheader={<Typography variant="body2" color="text.secondary" noWrap title={company}>{company}</Typography>}
            />
            <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {location || 'Remote'}
                </Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                    {tags && tags.slice(0, 3).map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                    ))}
                    {tags && tags.length > 3 && <Chip label={`+${tags.length - 3}`} size="small" />}
                </Stack>
            </CardContent>
            <Divider sx={{ mx: 2 }} />
            <Box sx={{ p: 2 }}>
                <Button
                    fullWidth
                    onClick={handleButtonClick}
                    endIcon={<OpenInNewIcon />}
                >
                    View Original Post
                </Button>
            </Box>
        </Card>
    );
}