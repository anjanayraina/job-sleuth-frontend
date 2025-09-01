import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { text: 'Liked Jobs', icon: <FavoriteIcon />, index: 0 },
        { text: 'Saved Jobs', icon: <BookmarkIcon />, index: 1 },
        { text: 'Account', icon: <AccountCircleIcon />, index: 2 },
    ];

    return (
        <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            selected={activeTab === item.index}
                            onClick={() => setActiveTab(item.index)}
                            sx={{
                                borderRadius: 1,
                                mb: 1,
                                '&.Mui-selected': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;