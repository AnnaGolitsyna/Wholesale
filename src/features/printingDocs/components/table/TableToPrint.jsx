import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const TableToPrint = ({ data, columns }) => {
  const dataSource = [...data]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((el, index) => ({ ...el, index: index + 1 }));

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
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
