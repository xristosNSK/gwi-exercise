import { FC } from 'react';

import { Typography, Slider, Box } from '@mui/material';

interface Props {
  lifeSpan: string;
}

const MIN_LIFE_SPAN = 5;
const MAX_LIFE_SPAN = 25;

export const LifeSpanSlider: FC<Props> = ({ lifeSpan }) => {
  const [min, max] = lifeSpan.split('-').map((v) => parseInt(v.trim()));

  if (typeof min !== 'number' || typeof max !== 'number')
    return <Typography variant="body2">{lifeSpan}</Typography>;

  return (
    <Box marginBottom={2}>
      <Typography variant="body1" textAlign="center" gutterBottom>
        Life Span
      </Typography>

      <Slider
        disableSwap
        marks={[
          {
            value: min,
            label: min,
          },
          {
            value: max,
            label: max,
          },
        ]}
        step={null}
        value={[min, max]}
        min={MIN_LIFE_SPAN}
        max={MAX_LIFE_SPAN}
      />
    </Box>
  );
};
