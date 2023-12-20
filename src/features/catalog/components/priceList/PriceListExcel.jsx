import React from 'react';
//import PropTypes from 'prop-types'
import { CSVLink } from 'react-csv';
import { Space, Typography, Layout } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
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

  const data = productsList
    .map(({ name, supplier, cost, superBulk, bulk, retail }) => {
      return {
        name,
        supplier,
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
        headers={headers}
        filename={`price-list-${today}.csv`}
        separator={';'}
        // className="ant-btn"
      >
        <Space size={'middle'}>
          <FileExcelOutlined style={{ fontSize: 25 }} />
          <Typography.Text keyboard> Скачать прайс-лист</Typography.Text>
        </Space>
      </CSVLink>
    </>
  );
};

//PriceListExcel.propTypes = {}

export default PriceListExcel;
