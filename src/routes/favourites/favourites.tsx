import { FC, useState, useEffect, useRef } from 'react';

import { Grid, Tooltip, Alert } from '@mui/material';
import { AiFillHeart } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ModalTypes } from '@/models/constants/modal-types';
import { AnimalImage } from '@/models/interfaces/animal-image';
import { Favourite } from '@/models/interfaces/favourite';
import { getAnimalType } from '@/models/ui';

import { AnimalCard } from '@/components/animal-card';
import { Loader } from '@/components/loader';

import { getFavorites, deleteFavourite } from '@/services/animal-api';

import { httpErrorHandler } from '@/utils/http-error-handler';

import { FavouriteBtn } from './favourites.style';

const LIMIT = 10;

export const Favourites: FC = () => {
  const animalType = useSelector(getAnimalType);
  const [, setParams] = useSearchParams();
  const page = useRef(0);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState('');

  const fetchFavourites = (newFavourites = favourites) => {
    getFavorites(animalType, page.current, undefined, LIMIT)
      .then((favs) => {
        if (favs.length) {
          const newFavorites = [...newFavourites, ...favs];

          setHasMore(favs.length === LIMIT);
          setFavourites(newFavorites);
        } else {
          setHasMore(false);
        }
      })
      .catch((res) => {
        setHasMore(false);
        setError(httpErrorHandler(res));
      })
      .finally(() => setInitialized(true));
  };

  const onImageClick = (imgData: AnimalImage) => {
    setParams((params) => {
      params.set('type', ModalTypes.Details);
      params.set('id', imgData.id);
      params.set('animal', animalType);
      return params;
    });
  };

  const onLoadMore = () => {
    page.current += 1;
    fetchFavourites();
  };

  const onFavouriteRemoved = (e: CustomEvent<number>) => {
    const favouriteId = e.detail;

    setFavourites(favourites.filter((f) => f.id !== favouriteId));
  };

  const onFavouriteClick = (id: number) => {
    deleteFavourite(animalType, id).then(() => onFavouriteRemoved({ detail: id } as any));
  };

  useEffect(() => {
    window.addEventListener('favourite-removed' as any, onFavouriteRemoved);
    return () => window.removeEventListener('favourite-removed' as any, onFavouriteRemoved);
  }, [favourites]);

  useEffect(() => {
    setFavourites([]);
    setInitialized(false);
    fetchFavourites([]);
  }, [animalType]);

  useEffect(() => {
    if (initialized) window.dispatchEvent(new CustomEvent('scroll'));
  }, [initialized]);

  if (!initialized) return <Loader size={64} />;

  if (!favourites.length) return <Alert severity='warning'>No Favourites yet</Alert>;

  return (
    <>
      <InfiniteScroll
        dataLength={favourites.length}
        next={onLoadMore}
        hasMore={hasMore}
        loader={<Loader size={64} />}
      >
        <Grid container justifyContent='center' spacing={5} paddingTop={2} paddingBottom={2}>
          {favourites.map((favourite) => (
            <Grid key={favourite.id} item xs={12} sm={6} md={4} lg={3}>
              <AnimalCard
                imageUrl={favourite?.image?.url}
                onCardClick={() => onImageClick(favourite?.image)}
              >
                <Tooltip title='Remove from favourites'>
                  <FavouriteBtn
                    size='small'
                    color='secondary'
                    onClick={() => onFavouriteClick(favourite.id)}
                  >
                    <AiFillHeart />
                  </FavouriteBtn>
                </Tooltip>
              </AnimalCard>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      {error && <Alert severity='error'>{error}</Alert>}
    </>
  );
};

export default Favourites;
