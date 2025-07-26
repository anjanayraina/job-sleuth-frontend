import * as React from "react";
import {
  Card, CardHeader, CardContent, CardActions,
  Button, Typography, Chip, Stack, Avatar
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import ChatIcon from "@mui/icons-material/Chat"; // Use as placeholder for Discord

export default function JobCard({
  title,
  company,
  platform,
  channel,
  time,
  tags,
  onView
}) {
  return (
    <Card elevation={5} sx={{ borderRadius: 3, minWidth: 275, maxWidth: 370, m: "auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: platform === "Telegram" ? "#229ED9" : "#5865F2" }}>
            {platform === "Telegram"
              ? <TelegramIcon />
              : <ChatIcon /* Replace with <DiscordIcon /> when ready */ />
            }
          </Avatar>
        }
        title={<Typography variant="h6" fontWeight={700}>{title}</Typography>}
        subheader={
          <Typography variant="subtitle2" color="text.secondary">
            {company} · {channel}
          </Typography>
        }
      />
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
          ))}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {time} · {platform}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color={platform === "Telegram" ? "info" : "secondary"}
          fullWidth
          endIcon={
            platform === "Telegram"
              ? <TelegramIcon />
              : <ChatIcon /* Replace with <DiscordIcon /> when ready */ />
          }
          onClick={onView}
        >
          View on {platform}
        </Button>
      </CardActions>
    </Card>
  );
}
