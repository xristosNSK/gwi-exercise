import { FC, useEffect, useState, useRef } from 'react';

import { Button, Box, Alert, useScrollTrigger } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ModalTypes } from '@/models/constants/modal-types';
import { AnimalImage } from '@/models/interfaces/animal-image';
import { getAnimalType } from '@/models/ui';

import { Loader } from '@/components/loader';
import { MasonryImages, MasonryListSeperator } from '@/components/masonry-images';

import { getImages } from '@/services/animal-api';

import { httpErrorHandler } from '@/utils/http-error-handler';

export const RandomImages: FC = () => {
  const animalType = useSelector(getAnimalType);
  const page = useRef(0);
  const masonryContainer = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(false);
  const [imagesDataChunks, setImagesDataChunks] = useState<AnimalImage[][]>([]);
  const [, setParams] = useSearchParams();

  const fetchImages = (dataChunks = imagesDataChunks) => {
    setFetching(true);

    getImages(animalType, page.current)
      .then((imgData) => {
        setError('');
        setImagesDataChunks([...dataChunks, imgData]);
      })
      .catch((res) => {
        page.current -= 1;
        setError(httpErrorHandler(res));
      })
      .finally(() => {
        setFetching(false);

        if (masonryContainer.current)
          setTimeout(() =>
            masonryContainer.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
          );
      });
  };

  const onLoadMoreClick = () => {
    page.current += 1;
    fetchImages();
  };

  const onImageClick = (imgData: AnimalImage) => {
    setParams(
      (params) => {
        params.set('type', ModalTypes.Details);
        params.set('id', imgData.id);
        params.set('animal', animalType);
        return params;
      },
      {
        state: imgData,
      }
    );
  };

  useEffect(() => {
    setImagesDataChunks([]);
    fetchImages([]);
  }, [animalType]);

  return (
    <Box paddingBottom={2}>
      {imagesDataChunks.map((images, idx) => (
        <div ref={masonryContainer} key={idx}>
          <MasonryImages imagesData={images} onImgClick={onImageClick} />
          {idx !== imagesDataChunks.length - 1 && <MasonryListSeperator />}
        </div>
      ))}

      {fetching && <Loader size={64} />}

      {error && <Alert severity='error'>{error}</Alert>}

      {Boolean(imagesDataChunks.length) && (
        <Box marginTop={2}>
          <Button
            type='button'
            variant='contained'
            fullWidth
            size='large'
            disabled={fetching}
            onClick={onLoadMoreClick}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};
