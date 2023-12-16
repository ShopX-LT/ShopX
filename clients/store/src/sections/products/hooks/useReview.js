import React, { useEffect, useState } from 'react';
import { getItemReviews } from '../../../services/reviewService';
import useAxiosWithStore from '../../../api/apiHooks/useAxiosWithStore';

const useReview = ({ itemId, isOpen }) => {
  const axios = useAxiosWithStore();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetItemReviews = async (itemId) => {
    const response = await getItemReviews(axios, itemId);
    if (!response) {
      setReviews([]);
      return;
    }
    setReviews(response);
  };

  useEffect(() => {
    if (isOpen) {
      handleGetItemReviews(itemId);
      setIsLoading(false);
    }
  }, [isOpen]);

  return { reviews };
};

export default useReview;
