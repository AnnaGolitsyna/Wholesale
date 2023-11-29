import React from 'react';
//import PropTypes from 'prop-types'
import { useGetContractorsListQuery } from '../../catalogApi';

const useContractorsListSelect = () => {
  const { data } = useGetContractorsListQuery();
  const newData = data?.map(item => {
    console.log('hook', item);
    return {
      label: item.name,
      value: item.id,

    };
  })
  return newData;
};



//useContractorsListSelect.propTypes = {}

export default useContractorsListSelect;
