import { createTheme, responsiveFontSizes } from '@mui/material';

export const theme = (mode: 'light' | 'dark') =>
  responsiveFontSizes(
    createTheme({
      palette: {
        mode,

        primary: {
          contrastText: '#fff',
          main: mode === 'light' ? '#77bca5' : '#569e83',
        },

        secondary: {
          main: '#f46353',
        },

        background:
          mode === 'light'
            ? {
                default: '#EDF1F7',
                paper: '#fff',
              }
            : {
                default: '#151515',
                paper: '#2c2c2c',
              },
      },

      typography: {
        fontFamily: "'Roboto', sans-serif",
      },

      components: {
        MuiCssBaseline: {
          styleOverrides: {
            '[hidden]': {
              display: 'none !important',
            },
          },
        },

        MuiAccordion: {
          defaultProps: {
            TransitionProps: {
              unmountOnExit: true,
            },
          },
        },
      },
    })
  );
