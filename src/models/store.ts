import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';

import { saveState } from './middleware/local-storage.middleware';

export const Store = configureStore({
  devTools: import.meta.env.DEV,
  reducer: rootReducer,
});

saveState(Store.getState());

Store.subscribe(() => {
  saveState(Store.getState());
});
