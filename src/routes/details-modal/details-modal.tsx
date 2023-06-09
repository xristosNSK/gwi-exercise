import { FC, useState, useEffect } from 'react';

import { Alert, Fab, Tooltip } from '@mui/material';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { VscCopy } from 'react-icons/vsc';
import { BiLinkExternal } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useSearchParams, useLocation } from 'react-router-dom';

import { ModalTypes } from '@/models/constants/modal-types';
import { AnimalImage } from '@/models/interfaces/animal-image';
import { Breed } from '@/models/interfaces/breed';
import { getAnimalType } from '@/models/ui';

import { BreedAccordion } from '@/components/breed-accordion';
import { Loader } from '@/components/loader';
import { Modal } from '@/components/modal';

import { httpErrorHandler } from '@/utils/http-error-handler';

import {
  getImageDetails,
  favoriteImage,
  getFavorites,
  deleteFavourite,
} from '@/services/animal-api';

import { DialogImageWrapper, DialogImage, DialogButtonsWrapper } from './details-modal.style';

export const DetailsModal: FC = () => {
  const animalType = useSelector(getAnimalType);
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [favoriteFetching, setFavoriteFetching] = useState(true);
  const [favorite, setFavorite] = useState<number>(null);
  const [details, setDetails] = useState<AnimalImage>(null);

  const onClose = () => {
    setParams((params) => {
      params.delete('type');
      params.delete('id');
      params.delete('animal');
      return params;
    });
  };

  const onFavoriteClick = () => {
    setFavoriteFetching(true);

    if (favorite) {
      deleteFavourite(animalType, favorite)
        .then(() => {
          setFavorite(null);
          window.dispatchEvent(new CustomEvent('favourite-removed', { detail: favorite }));
        })
        .finally(() => setFavoriteFetching(false));
    } else {
      favoriteImage(animalType, details.id)
        .then((favorite) => setFavorite(favorite.id))
        .finally(() => setFavoriteFetching(false));
    }
  };

  const onCopyLinkButtonClick = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const onBreedLinkClick = (breed: Breed) => {
    setParams(
      (params) => {
        params.set('type', ModalTypes.Breeds);
        params.set('id', breed.id);
        params.set('animal', animalType);
        return params;
      },
      { state: breed }
    );
  };

  const wrapper = (children: JSX.Element) => (
    <Modal showLoader={fetching} showClose onClose={onClose}>
      {children}
    </Modal>
  );

  useEffect(() => {
    if (location && params) {
      const id = location?.state?.id || params.get('id');

      if (location?.state) {
        setDetails(location.state);
        setFetching(false);
      } else {
        getImageDetails(animalType, id)
          .then(setDetails)
          .catch((res) => setError(httpErrorHandler(res)))
          .finally(() => setFetching(false));
      }
    }
  }, [location, params, animalType]);

  useEffect(() => {
    if (details?.id) {
      setFavoriteFetching(true);

      getFavorites(animalType, undefined, details.id)
        .then((favourites) => setFavorite(favourites[0]?.id))
        .finally(() => setFavoriteFetching(false));
    }
  }, [details, animalType]);

  if (fetching) return wrapper(<Loader size={64} />);

  if (error) return wrapper(<Alert severity='error'>{error}</Alert>);

  return wrapper(
    <>
      <DialogImageWrapper>
        <DialogImage src={details.url} />
      </DialogImageWrapper>

      <DialogButtonsWrapper>
        <Tooltip title={`${favorite ? 'Remove from' : 'Add to'} favourites`} placement='right'>
          <span>
            <Fab
              color='secondary'
              size='small'
              onClick={onFavoriteClick}
              disabled={favoriteFetching}
            >
              {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </Fab>
          </span>
        </Tooltip>

        <Tooltip title='Copy url' placement='right'>
          <Fab color='primary' size='small' onClick={onCopyLinkButtonClick}>
            <VscCopy />
          </Fab>
        </Tooltip>

        <Tooltip title='Open image in another tab' placement='right'>
          <Fab
            href={details.url}
            target='_blank'
            color='info'
            size='small'
            onClick={onCopyLinkButtonClick}
          >
            <BiLinkExternal />
          </Fab>
        </Tooltip>
      </DialogButtonsWrapper>

      {!details.breeds?.length && <Alert severity='warning'>No breeds data available</Alert>}

      {(details.breeds || []).map((breed) => (
        <BreedAccordion key={breed.id} breed={breed} onLinkClick={onBreedLinkClick} />
      ))}
    </>
  );
};
