import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const TableToPrint = ({ data, columns }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
        bordered
      />
    </>
  );
};

TableToPrint.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default TableToPrint;
