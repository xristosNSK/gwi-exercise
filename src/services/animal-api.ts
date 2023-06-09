import { AnimalImage } from '@/models/interfaces/animal-image';
import { AnimalType } from '@/models/interfaces/animal-type';
import { Breed } from '@/models/interfaces/breed';
import { Favourite } from '@/models/interfaces/favourite';

import { createApi } from './create-api';

const catsApi = createApi('https://api.thecatapi.com/v1', {
  'x-api-key': 'live_onhH5T8zF7FlaGZvwSo5QhYMUEUfTZg7iLo3fYAw8XsQRY9cZyjW21H1JRkefrpb',
});

const dogsApi = createApi('https://api.thedogapi.com/v1', {
  'x-api-key': 'live_7GsjawuTXbGkd1lpbKgScTgFAuXzHy9H3fWvG0XCZjQI1m8MTJDaYLOMALFBR1CD',
});

function getApiByType(type: AnimalType) {
  if (type === 'cat') return catsApi;
  return dogsApi;
}

export function getImages(
  type: AnimalType,
  page: number,
  breedsId?: string,
  limit = 10,
  order = 'RAND'
): Promise<AnimalImage[]> {
  const params: Record<string, any> = { limit, page, has_breeds: 1 };

  if (breedsId) {
    params.breed_ids = breedsId;
  }

  if (order) {
    params.order = order;
  }

  return getApiByType(type).get(`/images/search`, params);
}

export function getImageDetails(type: AnimalType, imageId: string): Promise<AnimalImage> {
  return getApiByType(type).get(`/images/${imageId}`);
}

export function getBreeds(type: AnimalType): Promise<Breed[]> {
  return getApiByType(type).get(`/breeds`);
}

export function favoriteImage(
  type: AnimalType,
  imageId: string
): Promise<{ id: number; message: string }> {
  return getApiByType(type).post(`/favourites`, { image_id: imageId });
}

export function getFavorites(
  type: AnimalType,
  page?: number,
  imageId?: string,
  limit?: number
): Promise<Favourite[]> {
  const params: Record<string, any> = {};

  if (typeof imageId !== 'undefined') params.image_id = imageId;
  else params.attach_image = 1;

  if (typeof page !== 'undefined') params.page = page;

  if (typeof limit !== 'undefined') params.limit = limit;

  return getApiByType(type).get(`/favourites`, params);
}

export function deleteFavourite(type: AnimalType, id: number): Promise<{ message: string }> {
  return getApiByType(type).delete(`/favourites/${id}`);
}
