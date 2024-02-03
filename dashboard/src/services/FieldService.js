const FIELD_URL = '/api/admin/options';

export async function getFields(axiosPrivate) {
  try {
    const response = await axiosPrivate.get(FIELD_URL);
    return response.data.options;
  } catch (error) {
    console.error(error);
    // alert(error.message);
    return null;
  }
}

export async function createFeature(axiosPrivate, toast, feature) {
  try {
    const response = await axiosPrivate.post(FIELD_URL, { feature });
    toast.success(`${feature} option created`);
    return response.data.options;
  } catch (error) {
    toast.error(`An error occurred creating ${feature} option, wait a moment and try again`);
    return null;
  }
}
export async function createFeatureValue(axiosPrivate, toast, feature, value) {
  try {
    const response = await axiosPrivate.post(`${FIELD_URL}/value`, { feature, value });
    toast.success(`${value} ${feature} option created`);
    return response.data.options;
  } catch (error) {
    toast.error(`An error occurred creating ${value} option, wait a moment and try again`);
    return null;
  }
}
