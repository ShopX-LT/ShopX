import { SET_STORE_STATS } from './types';

export const setStoreStats = (stats) => ({
  type: SET_STORE_STATS,
  payload: stats,
});
