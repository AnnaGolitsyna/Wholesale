import React from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import { Space, Button } from 'antd';
import ExcelIcon from '../../../../styles/icons/ExcelIcon';
import { formattedPriceToExcel } from '../../../../utils/priceUtils';
import { getToday } from '../../../../utils/dateUtils';
import { excelHeaders } from './excelHeaders';

const PriceListExcel = ({ productsList }) => {

  const data = productsList
    .map(({ name, supplier, cost, superBulk, bulk, retail }) => {
      return {
        name,
        supplier: supplier.label,
        cost: formattedPriceToExcel(cost),
        superBulk: formattedPriceToExcel(superBulk),
        bulk: formattedPriceToExcel(bulk),
        retail: formattedPriceToExcel(retail),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const today = getToday();

 
  return (
    <>
      <CSVLink
        data={data}
        headers={excelHeaders}
        filename={`price-list-${today}.csv`}
        separator={';'}
      >
        <Space>
          <ExcelIcon />
          <Button>Экспорт в Excel</Button>
        </Space>
      </CSVLink>
    </>
  );
};

PriceListExcel.propTypes = {
  productsList: PropTypes.array.isRequired,
};

export default PriceListExcel;
