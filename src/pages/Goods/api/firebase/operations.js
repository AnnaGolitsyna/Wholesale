import { useState, useMemo } from 'react';
import { getDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { v4 as uuidv4 } from 'uuid';
import { getGoodsListRef, getProductDocRef } from './firebaseRefs';

export const useFirebaseGoodsList = (activeStatus) => {
  const [rawData, loading, firebaseError] = useCollectionData(
    getGoodsListRef(),
    {
      idField: 'id',
    },
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

export const useAddGoodsFirebase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addGoods = async (body) => {
    setIsLoading(true);
    try {
      const newId = uuidv4();
      const goodsRef = getGoodsListRef();

      await setDoc(doc(goodsRef, newId), {
        ...body,
        id: newId,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return [addGoods, { isLoading, error }];
};

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

      // Filter out undefined values (Firebase doesn't accept undefined)
      const filteredBody = Object.fromEntries(
        Object.entries(body).filter(([, value]) => value !== undefined),
      );

      await setDoc(docRef, filteredBody);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return [updateProduct, { isLoading, error }];
};
