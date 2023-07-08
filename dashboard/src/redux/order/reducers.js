import { UPDATE_ORDERS, ORDERS_ERROR } from './types';

const initialState = {
  orders: [],
  error: '',
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORDERS:
      return {
        ...state,
        orders: action.payload,
        error: '',
      };
    case ORDERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
