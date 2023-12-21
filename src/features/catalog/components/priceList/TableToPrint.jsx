import React from 'react';
//import PropTypes from 'prop-types'
import { ConfigProvider } from 'antd';
import { Table, Typography, Space } from 'antd';
import { formattedPriceToString } from '../../../../utils/priceUtils';
import { getShortDateFormat } from '../../../../utils/dateUtils';
import { getContractorNameById } from '../../utils/contractors/getContractorNameById';
import dayjs from 'dayjs';

const TableToPrint = ({ data, contractorslist }) => {
  console.log('tablePrint', data, contractorslist);
  const columns = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Дата старта продаж',
      dataIndex: 'dateStart',
      key: 'dateStart',
      render: (text) => text && getShortDateFormat(text),
    },

    {
      title: 'Закупка',
      dataIndex: 'cost',
      key: 'cost',
      render: (number) => formattedPriceToString(number),
    },
    {
      title: 'Крупный опт',
      dataIndex: 'superBulk',
      key: 'superBulk',
      render: (number) => formattedPriceToString(number),
    },
    {
      title: 'Опт',
      dataIndex: 'bulk',
      key: 'bulk',
      render: (number) => formattedPriceToString(number),
    },
    {
      title: 'Розница',
      dataIndex: 'retail',
      key: 'retail',
      render: (number) => formattedPriceToString(number),
    },
    {
      title: 'Поставщик',
      dataIndex: 'supplier',
      key: 'supplier',
      render: (supplier) => getContractorNameById(supplier, contractorslist),

      filters: contractorslist?.map(({ label, value }) => ({
        text: label,
        value,
      })),

      onFilter: (value, record) => record.supplier === value,
      filterSearch: true,
    },
  ];

  const customTitleRenderer = (currentPageData) => {
    return (
      <Space>
        <Typography.Title>Прайс-лист</Typography.Title>
        {/* Add any other title-related elements or customization here */}
        <Space>
          <Typography.Text>
            Всего {currentPageData.length} элементов.
          </Typography.Text>
          <Typography.Text>Дата {getShortDateFormat(dayjs())}</Typography.Text>
        </Space>
      </Space>
    );
  };

  return (
    <>
      <ConfigProvider
        theme={{
          inherit: false,
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          title={customTitleRenderer}
        />
      </ConfigProvider>
    </>
  );
};

//TableToPrint.propTypes = {}

export default TableToPrint;
