import { useState, useMemo } from 'react';
import { getDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { v4 as uuidv4 } from 'uuid';
import { getContractorsListRef, getContractorDocRef } from './firebaseRef';

/**
 * Hook to fetch contractors list from Firebase with filtering by active status
 * @param {boolean} activeStatus - Filter contractors by active status (true/false)
 * @returns {Object} { data, isLoading, isError, error }
 */
export const useFirebaseContractorsList = (activeStatus) => {
  const [rawData, loading, firebaseError] = useCollectionData(
    getContractorsListRef(),
    {
      idField: 'id',
    }
  );

  const data = useMemo(() => {
    if (loading || !rawData) return [];

    return rawData.filter((item) => item.active === activeStatus);
  }, [rawData, activeStatus, loading]);

  return {
    data,
    isLoading: loading,
    isError: !!firebaseError,
    error: firebaseError,
  };
};

/**
 * Hook to add a new contractor to Firebase
 * @returns {Array} [addContractor, { isLoading, error }]
 */
export const useAddContractorFirebase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addContractor = async (body) => {
    setIsLoading(true);
    setError(null);

    try {
      const newId = uuidv4();
      const contractorRef = getContractorsListRef();

      await setDoc(doc(contractorRef, newId), {
        ...body,
        id: newId,
        createdAt: serverTimestamp(),
        // Ensure required arrays exist
        relatedCompanies: body.relatedCompanies || [],
        listOrderedItems: body.listOrderedItems || [],
      });

      return newId; // Return the new ID for further use if needed
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return [addContractor, { isLoading, error }];
};

/**
 * Hook to update an existing contractor in Firebase
 * @returns {Array} [updateContractor, { isLoading, error }]
 */
export const useUpdateContractorFirebase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateContractor = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const { key, ...body } = data;

      const docRef = getContractorDocRef(key);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('CONTRACTOR_NOT_FOUND');
      }

      await setDoc(docRef, {
        ...body,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return [updateContractor, { isLoading, error }];
};

/**
 * Hook to get a single contractor by ID from Firebase
 * @param {string} contractorId - The contractor ID to fetch
 * @returns {Object} { data, isLoading, isError, error }
 */
export const useGetContractorByIdFirebase = (contractorId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useMemo(async () => {
    if (!contractorId) return;

    setIsLoading(true);
    setError(null);

    try {
      const docRef = getContractorDocRef(contractorId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData({
          ...docSnap.data(),
          id: docSnap.id,
          key: docSnap.id,
        });
      } else {
        throw new Error('CONTRACTOR_NOT_FOUND');
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [contractorId]);

  return {
    data,
    isLoading,
    isError: !!error,
    error,
  };
};
