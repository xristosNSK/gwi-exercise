import { styled, Fab } from '@mui/material';

export const FavouriteBtn = styled(Fab)(
  ({ theme: { spacing } }) => `
position: absolute;
top: ${spacing(1)};
right: ${spacing(1)}
`
);
