import React from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import { Space, Button } from 'antd';
import dayjs from 'dayjs';
import { formattedPriceToExcel } from '../../../../utils/priceUtils';
import { getShortDateFormat } from '../../../../utils/dateUtils';
import { excelHeaders } from './excelHeaders';
import { ReactComponent as ExcelTableIcon } from '../../../../styles/icons/brands/ExcelTableIcon.svg';

const ProductListExcel = ({ productList, date, docNumber }) => {
  const data = productList
    ?.map(({ name, number, count, selectedPrice }) => ({
      name,
      number,
      count,
      selectedPrice: formattedPriceToExcel(selectedPrice),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <CSVLink
      data={data || []}
      headers={excelHeaders}
      filename={`invoice-product-list-${docNumber}-${
        getShortDateFormat(date) || date
      }.csv`}
      separator={';'}
    >
      <Space>
        <ExcelTableIcon />
        <Button>В Excel</Button>
      </Space>
    </CSVLink>
  );
};

ProductListExcel.propTypes = {
  productList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      count: PropTypes.string.isRequired,
      selectedPrice: PropTypes.number.isRequired,
    })
  ),
  date: PropTypes.instanceOf(dayjs).isRequired,
  docNumber: PropTypes.string.isRequired,
};

ProductListExcel.defaultProps = {
  productList: [],
};

export default ProductListExcel;
