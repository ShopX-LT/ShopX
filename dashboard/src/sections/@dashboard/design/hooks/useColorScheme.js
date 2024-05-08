import { useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { getAllColorSchemes } from '../../../../services/WebDesign';

const useColorScheme = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [baseColor, setBaseColor] = useState('#f0250f');
  const [colorSchemes, setColorSchemes] = useState([]);

  const axios = useAxiosPrivate();

  const handleBaseColorChange = (event) => {
    event.preventDefault();
    setBaseColor(event.target.value);
  };

  const generateScheme = async () => {
    try {
      setIsLoading(true);
      const response = await getAllColorSchemes(axios, baseColor);
      setColorSchemes(response);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, generateScheme, baseColor, colorSchemes, handleBaseColorChange };
};

export default useColorScheme;
