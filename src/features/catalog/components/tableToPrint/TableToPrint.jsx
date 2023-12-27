import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider } from 'antd';
import { Table } from 'antd';
import TitleRenderer from './TitleRenderer';
import { getColumns } from './getColumns';

const TableToPrint = ({ data, columns }) => {
  return (
    <>
      <ConfigProvider
        theme={{
          inherit: false,
        }}
      >
        <TitleRenderer />
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small"
          bordered
        />
      </ConfigProvider>
    </>
  );
};

TableToPrint.propTypes = {
  data: PropTypes.array.isRequired,
  contractorslist: PropTypes.array,
};

export default TableToPrint;
