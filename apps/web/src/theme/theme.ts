'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#C0392B',
    },
    secondary: {
      main: '#F39C12',
    },
    background: {
      default: '#FAFAFA',
    },
  },
  typography: {
    fontFamily: 'var(--font-sarabun), sans-serif',
  },
});
