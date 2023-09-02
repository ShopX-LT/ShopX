import { UPDATE_ORDERS, ORDERS_ERROR } from './types';

export const updateOrders = (orders) => ({
  type: UPDATE_ORDERS,
  payload: orders,
});

export const ordersError = (error) => ({
  type: ORDERS_ERROR,
  payload: error,
});
