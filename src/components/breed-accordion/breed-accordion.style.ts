import { styled, iconButtonClasses } from '@mui/material';

export const SummaryButtons = styled('div')(
  ({ theme: { spacing } }) => `
  position: absolute;
  top: 50%;
  right: ${spacing(2)};
  transform: translateY(-50%);

  .${iconButtonClasses.root} {
    margin-left: ${spacing(1)}
  }
`
);
