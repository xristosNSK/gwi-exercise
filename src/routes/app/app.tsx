import { FC } from 'react';

import { Outlet, useSearchParams } from 'react-router-dom';

import { ModalTypes } from '@/models/constants/modal-types';

import { BreedsModal } from '@/routes/breeds-modal';
import { DetailsModal } from '@/routes/details-modal';

export const App: FC = () => {
  const [params] = useSearchParams();

  const hasId = Boolean(params.get('id'));

  return (
    <>
      {params.get('type') === ModalTypes.Details && hasId && <DetailsModal />}

      {params.get('type') === ModalTypes.Breeds && hasId && <BreedsModal />}

      <Outlet />
    </>
  );
};
