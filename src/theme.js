import { createTheme } from '@mui/material/styles';

// A clean, minimalist, and professional theme
const theme = createTheme({
    palette: {
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
        divider: '#E2E8F0',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: { fontWeight: 700, color: '#1E293B' },
        h5: { fontWeight: 600, color: '#334155' },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
    },
});

export default theme;