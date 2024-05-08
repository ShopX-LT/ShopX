import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import useAxiosPrivate from './useAxiosPrivate';

const useFormikHandler = () => {
  const axiosPrivate = useAxiosPrivate();
  // TODO: check what values and keys are and then rename them to be more descriptive
  const handleFormikSubmit = async ({
    hasImages = true,
    serviceFunction,
    values,
    onSubmitProps,
    successMessage,
    errorMessage,
  }) => {
    try {
      const formData = {};
      Object.keys(values).forEach((key) => {
        formData[key] = values[key];
      });
      if (hasImages) {
        // Append each image file to the formData object.
        values.images.forEach((image) => {
          formData.append('images', image);
        });
      }
      await serviceFunction(axiosPrivate, formData);
      onSubmitProps.resetForm();
      toast.success(successMessage);
    } catch (error) {
      toast.error(errorMessage);
    }
  };
  return { handleFormikSubmit };
};

export default useFormikHandler;

useFormikHandler.propTypes = {
  hasImages: PropTypes.bool,
  serviceFunction: PropTypes.func,
  values: PropTypes.object,
  onSubmitProps: PropTypes.func,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};
