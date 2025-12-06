import { useMemo } from 'react';
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
 * Function to add a new product to Firebase
 * @param {Object} body - Product data
 * @returns {Promise<string>} New product ID
 */
export const addOrderedProduct = async (body) => {
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
      value: body.value || newId,
    });

    return newId;
  } catch (err) {
    throw err;
  }
};

/**
 * Function to update an existing product in Firebase
 * @param {Object} data - Product data with key or id
 * @returns {Promise<void>}
 */
export const updateOrderedProduct = async (data) => {
  try {
    const { key, id, ...body } = data;
    const documentId = key || id || body.value;

    if (!documentId) {
      throw new Error('Product ID (key or id) is required for update');
    }

    const docRef = getProductDocRef(documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('PRODUCT_NOT_FOUND');
    }

    await setDoc(docRef, {
      ...body,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    throw err;
  }
};

/**
 * Hook to get a single product by ID from Firebase
 * @param {string} productId - The product ID (value) to fetch
 * @returns {Object} { data, isLoading, isError, error }
 */
// export const useGetProductByIdFirebase = (productId) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useMemo(async () => {
//     if (!productId) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const docRef = getProductDocRef(productId);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setData({
//           ...docSnap.data(),
//           id: docSnap.id,
//           key: docSnap.id,
//         });
//       } else {
//         throw new Error('PRODUCT_NOT_FOUND');
//       }
//     } catch (err) {
//       setError(err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [productId]);

//   return {
//     data,
//     isLoading,
//     isError: !!error,
//     error,
//   };
// };
