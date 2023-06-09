import { Breed } from './breed';

export interface AnimalImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
}
