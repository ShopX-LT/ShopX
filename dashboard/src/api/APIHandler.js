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
      console.error(error);
      console.log('Error in SignIn');
      alert('Error in SignIn');
      return false;
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
