import { useState, useEffect } from 'react';
import { axiosInstance } from './Axios/Axios';

const useApi = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(url)
            .then(response => {
                setData(response.data);
                setError(null);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
};

export default useApi;
