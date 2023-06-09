import { FC, useState, useEffect, useRef, Fragment } from 'react';

import { Box, Alert } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useSearchParams, useLocation } from 'react-router-dom';

import { ModalTypes } from '@/models/constants/modal-types';
import { AnimalImage } from '@/models/interfaces/animal-image';
import { getAnimalType } from '@/models/ui';

import { BreedAccordion } from '@/components/breed-accordion';
import { Loader } from '@/components/loader';
import { MasonryImages, MasonryListSeperator } from '@/components/masonry-images';
import { Modal } from '@/components/modal';

import { httpErrorHandler } from '@/utils/http-error-handler';

import { getImages } from '@/services/animal-api';

const LIMIT = 10;

export const BreedsModal: FC = () => {
  const animalType = useSelector(getAnimalType);
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const page = useRef(0);
  const paperRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');
  const [initialized, setInitialized] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [dataBatch, setDataBatch] = useState<AnimalImage[][]>([]);

  const fetchImages = () => {
    const id = params?.get('id');

    if (id) {
      getImages(animalType, page.current, id, LIMIT, 'ASC')
        .then((batch) => {
          if (batch.length) {
            setHasMore(batch.length === LIMIT);
            setDataBatch([...dataBatch, batch]);
          } else {
            setHasMore(false);
          }
        })
        .catch((r: Response) => {
          setError(httpErrorHandler(r));
          setHasMore(false);
        })
        .finally(() => setInitialized(true));
    }
  };

  const onLoadMore = () => {
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
      { state: imgData }
    );
  };

  const onClose = () => {
    setParams((params) => {
      params.delete('type');
      params.delete('id');
      params.delete('animal');
      return params;
    });
  };

  const onMasonryLoad = () => {
    paperRef.current?.dispatchEvent(new Event('scroll'));
  };

  const wrapper = (children: JSX.Element) => {
    const breed = location.state?.id ? location.state : dataBatch?.[0]?.[0]?.breeds?.[0];

    return (
      <Modal
        onClose={onClose}
        showLoader={!initialized}
        PaperProps={{
          ref: paperRef,
          id: 'breeds-scroller',
        }}
      >
        {initialized && breed && <BreedAccordion breed={breed} onCloseClick={onClose} />}
        {children}
      </Modal>
    );
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (initialized) {
      paperRef.current?.dispatchEvent(new Event('scroll'));
    }
  }, [initialized]);

  if (!dataBatch.length) return wrapper(<Alert severity='warning'>No images found</Alert>);

  return wrapper(
    <>
      <InfiniteScroll
        dataLength={dataBatch.length}
        next={onLoadMore}
        hasMore={hasMore}
        scrollableTarget='breeds-scroller'
        loader={<Loader size={64} />}
      >
        <Box padding={2}>
          {dataBatch.map((batch, idx) => (
            <Fragment key={idx}>
              <MasonryImages
                key={idx}
                cols={{ sm: 2, md: 3 }}
                imagesData={batch}
                onImgClick={onImageClick}
                onLoad={onMasonryLoad}
              />

              {idx !== dataBatch.length - 1 && <MasonryListSeperator />}
            </Fragment>
          ))}
        </Box>
      </InfiniteScroll>

      {error && <Alert severity='error'>{error}</Alert>}
    </>
  );
};
