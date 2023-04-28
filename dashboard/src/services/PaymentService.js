const BANK_LIST_URL = '/api/admin/bank-list';
const PAYOUT_URL = '/api/admin/payout';

export async function getBankList(axiosPrivate) {
  try {
    const response = await axiosPrivate.get(BANK_LIST_URL);
    return response.data.banks;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}

export async function requestPayout(axiosPrivate, details) {
  try {
    const response = await axiosPrivate.post(PAYOUT_URL, details);
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}
