const FIELD_URL = '/api/admin/field';

export async function getFields(axiosPrivate) {
  try {
    const response = await axiosPrivate.get(FIELD_URL);
    return response.data.fields;
  } catch (error) {
    console.error(error);
    // alert(error.message);
    return null;
  }
}

export async function creatField(axiosPrivate, toast, field) {
  try {
    const response = await axiosPrivate.post(FIELD_URL, { field });
    toast.success(`${field} Field created`);
    return response.data.fields;
  } catch (error) {
    toast.error(`An error occurred creating ${field} Field, wait a moment and try again`);
    return null;
  }
}
