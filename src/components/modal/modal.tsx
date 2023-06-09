import { FC } from 'react';

import { Dialog, DialogProps, IconButton, Tooltip } from '@mui/material';
import { IoMdClose } from 'react-icons/io';

import { Loader } from '@/components/loader';

import { TopButtons } from './modal.style';

interface Props extends Omit<DialogProps, 'open'> {
  showLoader?: boolean;
  showClose?: boolean;
}

export const Modal: FC<Props> = ({ showLoader, showClose, children, ...rest }) => (
  <Dialog {...rest} open maxWidth='md' fullWidth={!showLoader}>
    {showLoader ? (
      <Loader size={64} />
    ) : (
      <>
        {children}

        <TopButtons>
          {showClose && (
            <Tooltip title='Close'>
              <IconButton size='small' onClick={() => rest.onClose({}, 'backdropClick')}>
                <IoMdClose />
              </IconButton>
            </Tooltip>
          )}
        </TopButtons>
      </>
    )}
  </Dialog>
);
