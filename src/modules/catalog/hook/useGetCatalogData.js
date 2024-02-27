import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetContractorsListQuery } from '../../../features/catalog/catalogApi';

const useGetCatalogData = (itemsStatus) => {
  const catalogDataTypes = {
    contractors: useGetContractorsListQuery,
  };
  const { data, isLoading, isError, error } =
    catalogDataTypes.contractors(itemsStatus);
 // console.log('hook', data);
  return { data, isLoading, isError, error };
};

export default useGetCatalogData;
