import { FC, Fragment } from 'react';

import { Grid, Typography, LinearProgress } from '@mui/material';

interface Props {
  scores: Record<string, number>;
  range: [number, number];
}

function normalizeScore(value: number, range: [number, number]) {
  return ((value - range[0]) * 100) / (range[1] - range[0]);
}

export const ScoresGrid: FC<Props> = ({ scores, range }) => (
  <Grid container spacing={1} marginBottom={2} justifyContent="center" alignItems="center">
    {Object.entries(scores).map(([label, value]) => (
      <Fragment key={label}>
        <Grid item xs={12} sm={3}>
          <Typography variant="body2" textOverflow="ellipsis" overflow="hidden">
            {label}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={9}>
          <LinearProgress variant="determinate" value={normalizeScore(value, range)} />
        </Grid>
      </Fragment>
    ))}
  </Grid>
);
