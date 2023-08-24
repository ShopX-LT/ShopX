import { useContext } from 'react';

import StoreContext from '../context/StoreProvider';

const useStore = () => {
  return useContext(StoreContext);
};

export default useStore;
