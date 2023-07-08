import { SET_STORE_STATS } from './types';

const initialState = {
  store: {},
};

const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STORE_STATS:
      return { ...state, store: action.payload };
    default:
      return state;
  }
};

export default statsReducer;
