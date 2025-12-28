import { useState, useCallback } from 'react';
const useErrorHandling = () => {
  const [userError, setUserError] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);

  const handleError = useCallback((error) => {
    error.errorFields ? setUserError(error) : setFirebaseError(error);
  }, []);

  const clearErrors = useCallback(() => {
    setUserError(null);
    setFirebaseError(null);
  }, []);

  return { userError, firebaseError, handleError, clearErrors };
};

export { useErrorHandling }