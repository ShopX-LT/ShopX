import { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { getStoreDesign, updateStoreDesign } from '../../../../services/WebDesign';
import { INITIAL_STATE, designReducer } from './designReducer';
import { CHANGE_INPUT, FETCH_START } from './actions';

const useDesign = () => {
  const axios = useAxiosPrivate();
  const [design, dispatch] = useReducer(designReducer, INITIAL_STATE);

  const handleInputChange = (event) => {
    dispatch({ type: CHANGE_INPUT, payload: { name: event.target.name, value: event.target.value } });
  };

  const retreiveDesign = async () => {
    try {
      const des = await getStoreDesign(axios);
      if (des) {
        dispatch({ type: FETCH_START, payload: des });
      }
    } catch (error) {
      toast.error('Error retrieving data, wait a moment and try again');
    }
  };

  const updateDesign = async (update) => {
    try {
      const des = await updateStoreDesign(axios, update);
      if (des) {
        dispatch({ type: FETCH_START, payload: des });
        toast.success('Update Successful');
      }
    } catch (error) {
      toast.error('Error updating design, wait a moment and try again');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = { nav: {}, hero: {}, productContainer: {} };
    // Append each form value to the formData object.
    Object.keys(design).forEach((key) => {
      switch (key.slice(0, 3)) {
        case 'nav':
          formData.nav[key] = design[key];
          break;
        case 'mai':
          formData[key] = design[key];
          break;
        case 'pro':
          formData.productContainer[key] = design[key];
          break;
        default:
          formData.hero[key] = design[key];
          break;
      }
    });

    await updateDesign(formData);
  };

  useEffect(() => {
    retreiveDesign();
  }, []);

  return { design, handleInputChange, handleFormSubmit, updateDesign };
};

export default useDesign;
