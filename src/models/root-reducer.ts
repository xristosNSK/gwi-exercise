import { combineReducers } from '@reduxjs/toolkit';

import { reducer, name } from './ui/ui.slice';

export const rootReducer = combineReducers({
  [name]: reducer,
});

export type State = ReturnType<typeof rootReducer>;
