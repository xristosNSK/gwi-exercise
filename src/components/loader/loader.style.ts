import { styled } from '@mui/material';

export const LoaderWrapper = styled('div')<{ size?: number }>(
  ({ theme: { palette, typography, spacing }, size }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${spacing(4)};
  font-size: ${typography.pxToRem(size)};
  color: ${palette.divider};
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: animal-loader 1s linear forwards infinite alternate;

  &.cat {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
  }

  &.dog {
    stroke-dasharray: 60;
    stroke-dashoffset: 60;
  }

  @keyframes animal-loader {
    to {
      stroke-dashoffset: 0;
      color: ${palette.text.primary};
      animation-duration: 2s;
    }
  }
`
);
