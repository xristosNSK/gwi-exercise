import { styled, Card, darken, CardMedia } from '@mui/material';

export const StyledCard = styled(Card)(
  ({ theme: { spacing, palette } }) => `
  position: relative;
  box-shadow: 0 ${spacing(1)} ${spacing(2)} 0 ${darken(palette.background.paper, 0.2)};

  &:hover {
    box-shadow: 0 ${spacing(0.5)} ${spacing(1)} 0 ${darken(palette.background.paper, 0.2)};
  }
`
);

export const StyledCardMedia = styled(CardMedia)`
  height: 200px;
  background-position: top center;
`;
