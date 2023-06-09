import { FC } from 'react';

import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/header';

export const Layout: FC = () => (
  <main>
    <Header />

    <Container maxWidth="lg">
      <Outlet />
    </Container>
  </main>
);
