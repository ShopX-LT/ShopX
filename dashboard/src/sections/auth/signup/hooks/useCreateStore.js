import React, { useState } from 'react';
import { checkStoreName } from '../../../../services/CreateAccountService';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import APIHandler from '../../../../api/APIHandler';

const useCreateStore = () => {
  const axios = useAxiosPrivate();
  const apiHandler = new APIHandler();

  const [accountType, setAccountType] = useState('new');
  const [storeName, setStoreName] = useState('');
  const [product, setProduct] = useState('');
  const [brandColor, setBrandColor] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [isStoreNameValid, setIsStoreNameValid] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const forbiddenCharsRegex = /^[a-zA-Z0-9@'_-]*$/;

  const formValidation = () => {
    if (email.includes('<') || email.includes('>') || !email.includes('@')) {
      setErrorMessage('Invalid email');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (formValidation()) {
      const { success, url, error } = await apiHandler.signup({
        email,
        password,
        storeName,
        accountType,
        product,
        brandColor,
        verPassword: verifyPassword,
      });
      if (success) {
        setStoreUrl(url);
        return true;
      }
      setErrorMessage(error);
      return false;
    }
    return false;
  };
  const handleCheckStoreName = async () => {
    const response = await checkStoreName(axios, storeName);
    setIsStoreNameValid(response.isValid);
    return response;
  };

  const handleAccountTypeChange = (e) => {
    const { value } = e.target;
    if (value === 'new' || value === 'old') {
      setAccountType(value);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;

    switch (e.target.id) {
      case 'storeName':
        if (forbiddenCharsRegex.test(value)) {
          setStoreName(value);
        }
        break;
      case 'product':
        setProduct(value);
        break;
      case 'brandColor':
        setBrandColor(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'verifyPassword':
        setVerifyPassword(value);
        break;
      default:
        break;
    }
  };
  return {
    accountType,
    brandColor,
    email,
    errorMessage,
    isStoreNameValid,
    password,
    product,
    setErrorMessage,
    storeName,
    storeUrl,
    verifyPassword,
    handleAccountTypeChange,
    handleOnChange,
    handleCheckStoreName,
    handleSubmit,
  };
};

export default useCreateStore;
