import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSearchParamState = (
  paramName,
  defaultValue,
  formatter = (value) => value,
  dependencies = []
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState(() => {
    const paramValue = searchParams.get(paramName);
    return paramValue || defaultValue;
  });

  useEffect(() => {
    if (!searchParams.get(paramName)) {
      setSearchParams({ [paramName]: formatter(state) });
    }
  }, [searchParams, state, setSearchParams, paramName, formatter]);

  useEffect(() => {
    setState(defaultValue);
    setSearchParams({ [paramName]: formatter(defaultValue) });
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  const updateState = useCallback(
    (newValue) => {
      const formattedValue = formatter(newValue);
      setState(formattedValue);
      setSearchParams({ [paramName]: formattedValue });
    },
    [setSearchParams, paramName, formatter]
  );

  return [state, updateState];
};

export default useSearchParamState;


