import React from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import { Space, Button } from 'antd';
import { formattedPriceToExcel } from '../../../../utils/priceUtils';
import { getToday } from '../../../../utils/dateUtils';
import { excelHeaders } from './excelHeaders';
import {ReactComponent as ExcelTableIcon} from '../../../../styles/icons/brands/ExcelTableIcon.svg';

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

          <ExcelTableIcon />
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
