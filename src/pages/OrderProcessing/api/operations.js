import { useState, useMemo } from 'react';
import { getDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { v4 as uuidv4 } from 'uuid';
import { getProductsListRef, getProductDocRef } from './firebaseRefs';

/**
 * Hook to fetch all products from Firebase
 * @returns {Object} { data, isLoading, isError, error }
 */
export const useFirebaseProductsList = () => {
  const [rawData, loading, firebaseError] = useCollectionData(
    getProductsListRef(),
    {
      idField: 'id',
    }
  );

  const data = useMemo(() => {
    if (loading || !rawData) return [];

    // Sort by value (product ID) for consistent ordering
    return rawData.sort((a, b) => {
      const aVal = parseInt(a.value) || 0;
      const bVal = parseInt(b.value) || 0;
      return aVal - bVal;
    });
  }, [rawData, loading]);

  return {
    data,
    isLoading: loading,
    isError: !!firebaseError,
    error: firebaseError,
  };
};

/**
 * Hook to get products filtered by isBarter flag
 * @param {boolean} isBarter - Filter by barter status
 * @returns {Object} { data, isLoading, isError, error }
 */
export const useFirebaseProductsByBarter = (isBarter) => {
  const [rawData, loading, firebaseError] = useCollectionData(
    getProductsListRef(),
    {
      idField: 'id',
    }
  );

  const data = useMemo(() => {
    if (loading || !rawData) return [];

    return rawData
      .filter((item) => item.isBarter === isBarter)
      .sort((a, b) => {
        const aVal = parseInt(a.value) || 0;
        const bVal = parseInt(b.value) || 0;
        return aVal - bVal;
      });
  }, [rawData, isBarter, loading]);

  return {
    data,
    isLoading: loading,
    isError: !!firebaseError,
    error: firebaseError,
  };
};

/**
 * Hook to add a new product to Firebase
 * @returns {Array} [addProduct, { isLoading, error }]
 */
export const useAddProductFirebase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProduct = async (body) => {
    setIsLoading(true);
    setError(null);

    try {
      const newId = uuidv4();
      const productRef = getProductsListRef();

      await setDoc(doc(productRef, newId), {
        ...body,
        id: newId,
        createdAt: serverTimestamp(),
        // Ensure booleans
        weekly: body.weekly !== undefined ? body.weekly : false,
        isBarter: body.isBarter !== undefined ? body.isBarter : false,
      });

      return newId;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return [addProduct, { isLoading, error }];
};

/**
 * Hook to update an existing product in Firebase
 * @returns {Array} [updateProduct, { isLoading, error }]
 */
export const useUpdateProductFirebase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProduct = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const { key, ...body } = data;

      const docRef = getProductDocRef(key);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('PRODUCT_NOT_FOUND');
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

  return [updateProduct, { isLoading, error }];
};

/**
 * Hook to get a single product by ID from Firebase
 * @param {string} productId - The product ID (value) to fetch
 * @returns {Object} { data, isLoading, isError, error }
 */
export const useGetProductByIdFirebase = (productId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useMemo(async () => {
    if (!productId) return;

    setIsLoading(true);
    setError(null);

    try {
      const docRef = getProductDocRef(productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData({
          ...docSnap.data(),
          id: docSnap.id,
          key: docSnap.id,
        });
      } else {
        throw new Error('PRODUCT_NOT_FOUND');
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  return {
    data,
    isLoading,
    isError: !!error,
    error,
  };
};


