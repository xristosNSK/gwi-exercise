import { FC, useState, PropsWithChildren } from 'react';

import { Skeleton } from '@mui/material';

interface Props {
  imageUrl: string;
  skeletonHeight: number;
}

export const SkeletonImage: FC<Props & PropsWithChildren> = ({
  skeletonHeight,
  imageUrl,
  children,
}) => {
  const [loaded, setLoaded] = useState(false);

  if (loaded) return children;

  return (
    <>
      <img src={imageUrl} hidden onLoad={() => setLoaded(true)} />
      <Skeleton variant="rounded" animation="wave" width="100%" height={skeletonHeight} />
    </>
  );
};
