const FIELD_URL = '/api/admin/field';

export async function getFields(axiosPrivate) {
  try {
    const response = await axiosPrivate.get(FIELD_URL);
    return response.data.fields;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}

export async function creatField(axiosPrivate, field) {
  try {
    const response = await axiosPrivate.post(FIELD_URL, { field });
    return response.data.fields;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}
