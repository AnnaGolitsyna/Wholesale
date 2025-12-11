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
      const { id, ...body } = data; // Using 'id' instead of 'key'

      // 1. Search item by id
      const docRef = getContractorDocRef(id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('CONTRACTOR_NOT_FOUND');
      }

      // 2. Get all previous data from Firebase
      const existingData = docSnap.data();

      // 3. Remove _isBarterMode helper flag from body (Firebase doesn't allow undefined)
      const { _isBarterMode, ...cleanBody } = body;

      // 4. Special handling for all-purpose contractors: merge listOrderedItems
      let finalBody = cleanBody;
      if (existingData.category === 'all-purpose' && cleanBody.hasOwnProperty('listOrderedItems')) {
        const existingItems = existingData.listOrderedItems || [];
        const updatedItems = cleanBody.listOrderedItems || [];

        // Determine if we're updating barter or non-barter items
        // If updatedItems has items, check the first item's isBarter status
        // If updatedItems is empty, check if existing items had barter items to determine what we're clearing
        let isUpdatingBarter;
        if (updatedItems.length > 0) {
          isUpdatingBarter = updatedItems.some((item) => item.isBarter === true);
        } else {
          // When clearing all items, check if any of the items being replaced were barter items
          // Look at what's in the existing filtered data that's being sent
          // We need to infer from the context - check if existing has both types
          const hasBarterItems = existingItems.some((item) => item.isBarter === true);
          const hasNonBarterItems = existingItems.some((item) => !item.isBarter);

          // If we only have one type, we're clearing that type
          if (hasBarterItems && !hasNonBarterItems) {
            isUpdatingBarter = true;
          } else if (!hasBarterItems && hasNonBarterItems) {
            isUpdatingBarter = false;
          } else {
            // Both types exist, but we can't determine which to clear
            // In this case, check if there's a special flag or default to non-barter
            isUpdatingBarter = _isBarterMode === true;
          }
        }

        // Get items of the opposite type to preserve
        const itemsToPreserve = existingItems.filter(
          (item) => item.isBarter !== isUpdatingBarter
        );

        // Merge: items to preserve + updated items
        const mergedItems = [...itemsToPreserve, ...updatedItems];

        // Update body with merged items
        finalBody = {
          ...cleanBody,
          listOrderedItems: mergedItems,
        };
      }

      // 5. Merge existing data with new data (new data overwrites)
      await setDoc(docRef, {
        ...existingData, // Keep all previous data
        ...finalBody,
        id,
        createdAt: serverTimestamp(),
      });

      return { success: true };
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
