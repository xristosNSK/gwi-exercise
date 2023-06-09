import { FC, PropsWithChildren } from 'react';

import { CardContent, Typography, CardActionArea } from '@mui/material';

import { SkeletonImage } from '@/components/skeleton-image';

import MISSING_IMAGE_URL from '@/assets/missing-image.png';

import { StyledCard, StyledCardMedia } from './animal-card.style';

interface Props {
  imageUrl: string;
  title?: string;
  onCardClick?: () => void;
}

export const AnimalCard: FC<Props & PropsWithChildren> = ({
  imageUrl,
  title,
  onCardClick,
  children,
}) => (
  <StyledCard>
    <CardActionArea onClick={() => onCardClick?.()} disableRipple={!onCardClick}>
      <SkeletonImage imageUrl={imageUrl || MISSING_IMAGE_URL} skeletonHeight={200}>
        <StyledCardMedia image={imageUrl || MISSING_IMAGE_URL} />
      </SkeletonImage>

      {title && (
        <CardContent>
          <Typography variant="h6" textAlign="center">
            {title}
          </Typography>
        </CardContent>
      )}
    </CardActionArea>

    {children}
  </StyledCard>
);
