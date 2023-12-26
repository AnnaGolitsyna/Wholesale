import React from 'react';
//import PropTypes from 'prop-types'
import { ConfigProvider } from 'antd';
import { Table, Typography, Space } from 'antd';
import { formattedPriceToString } from '../../../../utils/priceUtils';
import { getShortDateFormat } from '../../../../utils/dateUtils';
import { getContractorNameById } from '../../utils/contractors/getContractorNameById';
import dayjs from 'dayjs';
import PuzzleIcon from '../../../../styles/icons/PuzzleIcon';

const TableToPrint = ({ data, contractorslist }) => {
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
      title: 'В продаже с',
      dataIndex: 'dateStart',
      key: 'dateStart',
      render: (text) => text && getShortDateFormat(text),
    },

    {
      title: 'Закупка',
      dataIndex: 'cost',
      key: 'cost',
      render: (number) => formattedPriceToString(number),
      align: 'center',
    },
    {
      title: 'Кр.опт',
      dataIndex: 'superBulk',
      key: 'superBulk',
      render: (number) => formattedPriceToString(number),
      align: 'center',
    },
    {
      title: 'Опт',
      dataIndex: 'bulk',
      key: 'bulk',
      render: (number) => formattedPriceToString(number),
      align: 'center',
    },
    {
      title: 'Розница',
      dataIndex: 'retail',
      key: 'retail',
      render: (number) => formattedPriceToString(number),
      align: 'center',
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
      <Space style={{display: 'flex', justifyContent: 'space-between'}}>
        <Space align="baseline">
          <Typography.Title level={3}>
            Прайс-лист от {getShortDateFormat(dayjs())}
          </Typography.Title>
          <Typography.Text>
            ({currentPageData.length} шт.)
          </Typography.Text>
        </Space>

        <PuzzleIcon />
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
          size="small"
          bordered
        />
      </ConfigProvider>
    </>
  );
};

//TableToPrint.propTypes = {}

export default TableToPrint;
