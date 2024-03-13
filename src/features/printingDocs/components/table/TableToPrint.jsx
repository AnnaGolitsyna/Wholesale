import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider } from 'antd';
import { Table } from 'antd';

const TableToPrint = ({ data, columns }) => {
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
          size="small"
          bordered
        />
      </ConfigProvider>
    </>
  );
};

TableToPrint.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default TableToPrint;
