import { styled, iconButtonClasses } from '@mui/material';

export const TopButtons = styled('div')(
  ({ theme: { spacing } }) => `
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;

  .${iconButtonClasses.root} {
    margin: ${spacing(0.5)};
  }
`
);
