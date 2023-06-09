import { FC } from 'react';

import { LuCat, LuDog } from 'react-icons/lu';
import { useSelector } from 'react-redux';

import { getAnimalType } from '@/models/ui';

import { LoaderWrapper } from './loader.style';

interface Props {
  size?: number;
}

export const Loader: FC<Props> = ({ size = 16 }) => {
  const animalType = useSelector(getAnimalType);

  return (
    <LoaderWrapper size={size} className={animalType}>
      {animalType === 'cat' ? <LuCat /> : <LuDog />}
    </LoaderWrapper>
  );
};
