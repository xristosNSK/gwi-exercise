import { styled, fabClasses } from '@mui/material';

export const DialogImageWrapper = styled('div')`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const DialogImage = styled('img')`
  min-width: 225px;
  max-height: 450px;
  height: auto;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

export const DialogButtonsWrapper = styled('div')(
  ({ theme: { spacing } }) => `
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${spacing(2)};
  left: ${spacing(2)};
  z-index: 2;

  .${fabClasses.root} {
    margin-bottom: ${spacing(1)};
  }
`
);
