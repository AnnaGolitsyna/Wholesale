import { useState, useEffect } from 'react';
import { getContractorReceivableData } from './operations/getContractorReceivableData';

const useReceivableData = (id) => {
  const [contractorData, setContractorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getContractorReceivableData(id);
      setContractorData(data);
    } catch (err) {
      console.error('Error fetching contractor data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const refetch = () => {
    fetchData();
  };

  return { contractorData, loading, error, refetch };
};

export { useReceivableData };
