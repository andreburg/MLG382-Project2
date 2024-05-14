import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#332941',
        },
        secondary: {
            main: '#002379',
        },
        background: {
            default: '#FFFAE6',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            marginBottom: '1rem',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
            marginBottom: '0.75rem',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
            marginBottom: '0.5rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.4,
        },
    },
});

export default theme;
