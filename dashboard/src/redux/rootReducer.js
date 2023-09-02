import { combineReducers } from 'redux';
import orderReducer from './order/reducers';
import statsReducer from './stats/reducers';

const rootReducer = combineReducers({
  orders: orderReducer,
  stats: statsReducer,
});

export default rootReducer;
