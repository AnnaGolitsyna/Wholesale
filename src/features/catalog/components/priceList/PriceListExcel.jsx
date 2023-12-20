import React from 'react';
//import PropTypes from 'prop-types'
import { CSVLink } from 'react-csv';
import { formattedPriceToString } from '../../../../utils/priceUtils';

const PriceListExcel = ({ productsList }) => {
  const headers = [
    { label: 'Наименование', key: 'name' },
    { label: 'Поставщик', key: 'supplier' },
    { label: 'Закупка', key: 'cost' },
    { label: 'Кр.опт', key: 'superBulk' },
    { label: 'Опт', key: 'bulk' },
    { label: 'Розница', key: 'retail' },
  ];

  const data = productsList.map(
    ({ name, supplier, cost, superBulk, bulk, retail }) => {
        
      return {
        name,
        supplier,
        cost: formattedPriceToString(cost),
        superBulk: formattedPriceToString(superBulk),
        bulk: formattedPriceToString(bulk),
        retail: formattedPriceToString(retail),
      };
    }
  );

  console.log('excel', productsList, headers, data);
  return <CSVLink data={data}>Download me</CSVLink>;
};

//PriceListExcel.propTypes = {}

export default PriceListExcel;
