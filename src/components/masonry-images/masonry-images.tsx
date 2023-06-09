import { FC } from 'react';

import { Breakpoint } from '@mui/material';

import { AnimalImage } from '@/models/interfaces/animal-image';

import { SkeletonImage } from '@/components/skeleton-image';

import { ReactComponent as Curve } from '@/assets/curve.svg';

import { MasonryList, MasonryItem, Seperator } from './masonry-images.style';

interface Props {
  imagesData: AnimalImage[];
  onImgClick?: (data: AnimalImage) => void;
  cols?: Partial<Record<Breakpoint, number>>;
  onLoad?: () => void;
}

const SKELETON_HEIGHTS = [150, 200, 250, 300, 350, 400];

export const MasonryImages: FC<Props> = ({
  imagesData,
  cols = { sm: 2, md: 3, lg: 4, xl: 5 },
  onImgClick,
  onLoad,
}) => (
  <MasonryList columnCount={cols} onLoad={onLoad}>
    {imagesData.map((imgData) => (
      <MasonryItem key={imgData.url} onClick={() => onImgClick?.(imgData)}>
        <SkeletonImage
          imageUrl={imgData.url}
          skeletonHeight={SKELETON_HEIGHTS[Math.floor(Math.random() * SKELETON_HEIGHTS.length)]}
        >
          <img src={imgData.url} />
        </SkeletonImage>
      </MasonryItem>
    ))}
  </MasonryList>
);

export const MasonryListSeperator: FC = () => (
  <Seperator>
    <Curve className='curve' />
  </Seperator>
);
