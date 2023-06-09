import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/components/layout';
import { lazyLoad } from '@/components/lazy-load';

import { App } from './app';
import { RandomImages } from './random-images';

import { Routes } from './routes';

const Breeds = lazyLoad(() => import('./breeds'));
const Favourites = lazyLoad(() => import('./favourites'));

export const Router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: Routes.randomImages.path,
            element: <RandomImages />,
          },

          {
            path: Routes.breed.path,
            element: <Breeds />,
          },

          {
            path: Routes.favourites.path,
            element: <Favourites />,
          },
        ],
      },
    ],
  },
]);
