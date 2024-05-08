const FIELD_URL = '/api/admin/options';

export async function getCustomFields(axiosPrivate) {
  const response = await axiosPrivate.get(FIELD_URL);
  const fields = response.data.options;
  if (!fields) {
    throw new Error('Error retrieving Item template');
  }
  return fields;
}

export async function createField(axiosPrivate, feature) {
  const response = await axiosPrivate.post(FIELD_URL, { feature });
  const newFeature = response.data.options;
  if (!newFeature) {
    throw new Error('Failed to create field');
  }
  return newFeature;
}
export async function createFieldValue(axiosPrivate, feature, value) {
  const response = await axiosPrivate.post(`${FIELD_URL}/value`, { feature, value });
  const newFeatureValue = response.data.options;
  if (!newFeatureValue) {
    throw new Error('Failed to create field value');
  }
  return newFeatureValue;
}
