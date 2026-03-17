import { useMemo } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../../api/firestore';
import { useAuth } from './useAuth';

/**
 * Resolves the authenticated client's contractor record from Firestore by email.
 * Returns contractorId, contractorName, loading, and error.
 */
const useClientAuth = () => {
  const { currentUser } = useAuth();

  const contractorsRef = useMemo(() => {
    if (!currentUser?.email) return null;

    return query(
      collection(db, 'balanutsa', 'catalogs', 'contractors'),
      where('email', '==', currentUser.email),
      where('active', '==', true)
    );
  }, [currentUser?.email]);

  const [data, loading, error] = useCollectionData(contractorsRef, {
    idField: 'id',
  });

  const contractor = data?.[0] ?? null;

  return {
    contractorId: contractor?.id ?? null,
    contractorName: contractor?.name ?? null,
    loading,
    error,
  };
};

export default useClientAuth;