import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useAxiosPrivate from './useAxiosPrivate';
import { getCustomFields, createField, createFieldValue } from '../services/FieldService';

const useFeature = () => {
  const axiosPrivate = useAxiosPrivate();
  const [itemCustomFields, setItemCustomFields] = useState([]);
  // GET THE ITEM TEMPLATE
  const retreiveItemCustomFields = async () => {
    try {
      const fields = await getCustomFields(axiosPrivate);
      setItemCustomFields(fields);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    retreiveItemCustomFields();
  }, []);

  // CREATING A FEATURE
  const createNewField = async (feature, onSubmitProps) => {
    try {
      const fields = await createField(axiosPrivate, feature.name);
      setItemCustomFields(fields);
      onSubmitProps.resetForm();
      toast.success(`'${feature.name}' option created`);
    } catch (error) {
      toast.error(`An error occurred creating '${feature.name}' option, wait a moment and try again`);
    }
  };

  // CREATING A FEATURE VALUE
  const createNewFeatureValue = async (featureValue, onSubmitProps, feature) => {
    try {
      const fields = await createFieldValue(axiosPrivate, feature, featureValue.name);
      toast.success(`'${featureValue.name}' ${feature} option created`);
      setItemCustomFields(fields);
      onSubmitProps.resetForm();
    } catch (error) {
      toast.error(`An error occurred creating ${featureValue.name} option, wait a moment and try again`);
    }
  };

  const formikFields = itemCustomFields.reduce((objectOfFeatures, currentOption) => {
    objectOfFeatures[currentOption.feature] = [];
    return objectOfFeatures;
  }, {});

  // TODO delete feature

  return { createNewField, createNewFeatureValue, formikFields, itemCustomFields };
};

export default useFeature;
