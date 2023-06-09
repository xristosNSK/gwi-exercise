import { FC } from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { Store } from '@/models/store';
import { getMode } from '@/models/ui';

import { Router } from '@/routes/router';

import { theme } from './theme';

const Theme: FC = () => {
  const mode = useSelector(getMode);

  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline enableColorScheme />

      <RouterProvider router={Router} />
    </ThemeProvider>
  );
};

export const UISetup: FC = () => (
  <ReduxProvider store={Store}>
    <Theme />
  </ReduxProvider>
);
