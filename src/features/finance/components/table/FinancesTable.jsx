import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const FinancesTable = ({ data, columns, isLoading }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered={true}
      showSorterTooltip={false}
      scroll={{ scrollToFirstRowOnChange: true, y: '55vh' }}
      pagination={false}
      loading={isLoading}
    />
  );
};

FinancesTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default FinancesTable;
