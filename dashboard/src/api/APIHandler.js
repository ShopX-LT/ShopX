/* eslint-disable class-methods-use-this */
import axios, { axiosPrivate } from './axios';
// import axios from 'axios';

export default class APIHandler {
  API = {
    SIGNIN: '/api/admin/signin',
    SIGNUP: '/signup',
    CREAT_ITEM: '/api/item/create',
    GET_ALL_ITEMS: '/api/item/store/items',
  };

  async signin(siginDetails) {
    try {
      const response = await axios.post(this.API.SIGNIN, siginDetails, {
        withCredentials: true,
      });
      const token = response?.data?.token;
      const admin = response?.data?.admin.email;
      const store = response?.data?.store?.name;

      return { token, admin, store };
    } catch (error) {
      // TODO: Handle different status response to display incorrect details

      if (!error.response) {
        const displayError = 'Network error, please try again later';
        return { error: displayError };
      }
      if (error.response.status === 401) {
        const displayError = 'Invalid store name, email or password';
        return { error: displayError };
      }
      return { error: 'An unexpected error has occurred' };
    }
  }

  // An alternative is to call the function from the services, just pass the api and axios as parameters
  async getAllItems() {
    try {
      const response = await axiosPrivate.get(this.API.GET_ALL_ITEMS);
      return response.data.items;
    } catch (error) {
      console.error(error);
      alert(error.message);
      return null;
    }
  }

  // async getRegisteredBanks(){

  // }
}
