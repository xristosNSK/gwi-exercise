import { AnimalImage } from './animal-image';

export interface Favourite {
  created_at: string;
  id: number;
  image: AnimalImage;
  image_id: string;
  sub_id: string;
  user_id: string;
}
