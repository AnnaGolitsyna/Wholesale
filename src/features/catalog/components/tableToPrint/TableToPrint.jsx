import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider } from 'antd';
import { Table } from 'antd';
import { titleRenderer } from './titleRenderer';
import { getColumns } from './getColumns';

const TableToPrint = ({ data, contractorslist }) => {
  const columns = getColumns(contractorslist);

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
          title={titleRenderer}
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
