/* eslint-disable class-methods-use-this */
import axios, { axiosPrivate } from './axios';
// import axios from 'axios';

export default class APIHandler {
  API = {
    SIGNIN: '/api/admin/signin',
    SIGNUP: '/api/admin/signup',
    CREAT_ITEM: '/api/item/create',
    GET_ALL_ITEMS: '/api/item/store/items',
  };

  // @INFO: it is better to use error code to prevent the server message from being seen by an attacker as it could give useful information

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

  async signup(signupDetails) {
    try {
      const response = await axios.post(this.API.SIGNUP, signupDetails, {
        withCredentials: true,
      });
      const token = response?.data?.token;
      const url = response?.data?.url;
      const admin = response?.data?.admin.email;
      const store = response?.data?.store?.name;

      return { token, admin, store, url };
    } catch (error) {
      if (!error.response) {
        const displayError = 'Server are down, please try again later';
        return { error: displayError };
      }
      if (error.response.data.message === 'Passwords do not match') {
        const displayError = 'The passwords do not match';
        return { error: displayError };
      }
      if (error.response.data.message === 'This account already exist') {
        const displayError = 'The passwords do not match';
        return { error: displayError };
      }
      if (error.response.status === 401) {
        const displayError = 'This user already exists. Use your user credentials to create the new store';
        return { error: displayError };
      }
      if (error.response.data.message === 'Store already exists') {
        const displayError = 'This store already exists. Try a different name';
        return { error: displayError };
      }

      return { error: 'An unexpected error has occurred' };
    }
  }

  // An alternative is to call the function from the services, just pass the api and axios as parameters
  async getAllItems(axiosPrivate) {
    try {
      const response = await axiosPrivate.get(this.API.GET_ALL_ITEMS);
      return response.data.items;
    } catch (error) {
      return null;
    }
  }

  // async getRegisteredBanks(){

  // }
}
