import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AnimalType } from '@/models/interfaces/animal-type';
import { getInitialSliceState } from '@/models/middleware/local-storage.middleware';

interface UiState {
  mode: 'light' | 'dark';
  animalType: AnimalType;
}

function animalTypeFromSearch() {
  const params = new URLSearchParams(location.search);
  const paramAnimal = params.get('animal') as AnimalType;

  if (['cat', 'dog'].includes(paramAnimal)) return paramAnimal;
  return null;
}

export function uiOverrides() {
  const paramAnimal = animalTypeFromSearch();

  if (paramAnimal)
    return {
      animalType: paramAnimal,
    };

  return {};
}

const { name, reducer, actions } = createSlice({
  name: 'ui',

  initialState: getInitialSliceState<UiState>(
    'ui',
    {
      mode: 'light',
      animalType: 'cat',
    },
    uiOverrides()
  ),

  reducers: {
    setMode: (state, { payload }: PayloadAction<UiState['mode']>) => {
      state.mode = payload;
    },

    setAnimalType: (state, { payload }: PayloadAction<UiState['animalType']>) => {
      state.animalType = payload;
    },
  },
});

export { name, actions, reducer };
