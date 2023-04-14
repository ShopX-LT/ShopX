const GET_FIELD_URL = '/api/admin/field';
const POST_FIELD_URL = '/api/admin/field';

export async function getFields(axiosPrivate) {
  try {
    const response = await axiosPrivate.get(GET_FIELD_URL);
    console.log(response.data.fields);
    return response.data.fields;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}

export async function creatField(axiosPrivate, field) {
  try {
    const response = await axiosPrivate.post(POST_FIELD_URL, { field });
    return response.data.fields;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}
