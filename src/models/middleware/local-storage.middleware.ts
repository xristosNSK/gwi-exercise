// @ts-ignore
import merge from 'lodash.merge';

const isLsAvailable = () => {
  try {
    localStorage.setItem('_test', '_');
    localStorage.removeItem('_test');
    return true;
  } catch {
    return false;
  }
};

export const getInitialSliceState = <SliceState = any>(
  slice: string,
  initialState: SliceState,
  overrides: Partial<SliceState> = {}
): SliceState => {
  try {
    const persistedStore = JSON.parse(localStorage.getItem('app-state')) || {};
    return merge(initialState, persistedStore?.[slice] || {}, overrides);
  } catch {
    return {} as SliceState;
  }
};

const lsAvailable = isLsAvailable();

export const saveState = (state: any) => {
  if (lsAvailable) {
    localStorage.setItem('app-state', JSON.stringify(state));
  }
};
