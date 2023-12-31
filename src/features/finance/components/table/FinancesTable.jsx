import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const FinancesTable = ({ data, columns }) => {
  console.log('ft', data, columns);
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered={true}
      showSorterTooltip={false}
      scroll={{ scrollToFirstRowOnChange: true, y: '55vh' }}
      pagination={false}
    />
  );
};

FinancesTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,

};

export default FinancesTable;
