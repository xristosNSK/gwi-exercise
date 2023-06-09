import { styled, Button } from '@mui/material';

export const NavButton = styled(Button)(
  ({ theme: { spacing } }) => `
  margin-right: ${spacing(1)};

  &.active {
    border: 1px solid currentColor;
  }
`
);

export const Grow = styled('div')`
  flex-grow: 1;
`;
