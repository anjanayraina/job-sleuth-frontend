import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976D2',
            light: '#64b5f6',
            dark: '#1565c0',
        },
        secondary: {
            main: '#FFA726', // A vibrant orange for contrast
            light: '#ffb74d',
            dark: '#f57c00',
        },
        background: {
            default: '#f4f6f8', // A very light grey for the page background
            paper: '#ffffff',   // White for cards and surfaces
        },
        text: {
            primary: '#212121', // Dark grey for primary text
            secondary: '#757575', // Lighter grey for secondary text
        }
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none', // Buttons will use normal case, not all-caps
            fontWeight: 'bold',
        }
    },
    shape: {
        borderRadius: 8, // Slightly more rounded corners for components
    },
});

export default theme;