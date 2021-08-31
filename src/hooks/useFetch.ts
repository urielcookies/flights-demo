/* eslint-disable react-hooks/exhaustive-deps */ /* temp */
import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoadingLoading] = useState<boolean>(true);

  const fetchMyAPI = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setIsLoadingLoading(false);
    } catch (e) {
      setError(e);
      setIsLoadingLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAPI();
    return () => {
      setData([]);
      setError(null);
      setIsLoadingLoading(false);
    };

  }, []);

  const refetch = () => {
    fetchMyAPI();
  };

  return {
    data,
    error,
    isLoading,
    refetch
  };
};

export default useFetch;
