import { AnimalType } from '../interfaces/animal-type';
import { State } from '../root-reducer';

export const getMode = (state: State) => state.ui.mode;

export const getAnimalType = (state: State) => state.ui.animalType as AnimalType;
