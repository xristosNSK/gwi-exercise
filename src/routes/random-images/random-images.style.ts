import { styled, CircularProgress } from '@mui/material';

export const Spinner = styled(CircularProgress)(
  ({ theme: { spacing } }) => `
  display: block;
  margin: ${spacing(3)} auto;
`
);
