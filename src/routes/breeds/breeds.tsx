import { FC, useEffect, useState } from 'react';

import { Grid, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ModalTypes } from '@/models/constants/modal-types';
import { Breed } from '@/models/interfaces/breed';
import { getAnimalType } from '@/models/ui';

import { AnimalCard } from '@/components/animal-card';
import { Loader } from '@/components/loader';

import { httpErrorHandler } from '@/utils/http-error-handler';

import { getBreeds } from '@/services/animal-api';

export const Breeds: FC = () => {
  const animalType = useSelector(getAnimalType);
  const [, setParams] = useSearchParams();
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(true);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const onBreedClick = (breedId: string) => {
    setParams((params) => {
      params.set('type', ModalTypes.Breeds);
      params.set('id', breedId);
      params.set('animal', animalType);
      return params;
    });
  };

  useEffect(() => {
    setFetching(true);

    getBreeds(animalType)
      .then(setBreeds)
      .catch((response) => setError(httpErrorHandler(response)))
      .finally(() => setFetching(false));
  }, [animalType]);

  if (fetching) return <Loader size={75} />;

  if (error) return <Alert severity='error'>{error}</Alert>;

  return (
    <Grid container justifyContent='center' spacing={5} paddingTop={2} paddingBottom={2}>
      {breeds.map((breed) => (
        <Grid key={breed.id} item xs={12} sm={6} md={4}>
          <AnimalCard
            imageUrl={breed?.image?.url}
            title={breed.name}
            onCardClick={() => onBreedClick(breed.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Breeds;
