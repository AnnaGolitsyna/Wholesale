import React from 'react';
//import PropTypes from 'prop-types'
import { CSVLink } from 'react-csv';
import { formattedPriceToExcel } from '../../../../utils/priceUtils';
import { getToday } from '../../../../utils/dateUtils';

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
        cost: formattedPriceToExcel(cost),
        superBulk: formattedPriceToExcel(superBulk),
        bulk: formattedPriceToExcel(bulk),
        retail: formattedPriceToExcel(retail),
      };
    }
  );

  const today = getToday();

  console.log('excel', productsList, headers, data);
  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={`price-list-${today}.csv`}
      separator={';'}
    >
      Download me
    </CSVLink>
  );
};

//PriceListExcel.propTypes = {}

export default PriceListExcel;
