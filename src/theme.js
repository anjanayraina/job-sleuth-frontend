import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1E293B', // Dark Slate
        },
        secondary: {
            main: '#64748B', // Lighter Slate
        },
        background: {
            default: '#F8FAFC', // Very light gray
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1E293B',
            secondary: '#64748B',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#94A3B8', // Light Slate for dark mode
        },
        secondary: {
            main: '#64748B', // Medium Slate
        },
        background: {
            default: '#0F172A', // Very Dark Blue
            paper: '#1E293B',   // Dark Slate
        },
        text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
});