import * as React from "react";
import { Card, CardHeader, CardContent, Button, Typography, Chip, Stack, Avatar, Divider, Box } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import ChatIcon from "@mui/icons-material/Chat"; // Placeholder for Discord
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function JobCard({ job, onView }) {
  // This check prevents the crash if job is undefined.
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
              transform: 'translateY(-6px) scale(1.01)',
              boxShadow: (theme) => `0 20px 40px ${theme.palette.primary.main}25`,
            }
          }}
      >
        <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: source && source.toLowerCase() === "telegram" ? "#229ED9" : "#5865F2" }}>
                {source && source.toLowerCase() === "telegram" ? <TelegramIcon /> : <ChatIcon />}
              </Avatar>
            }
            title={<Typography variant="h6" fontWeight={600} noWrap>{title}</Typography>}
            subheader={<Typography variant="body2" color="text.secondary" noWrap>{company}</Typography>}
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