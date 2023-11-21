import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { contractorsColumns } from '../../utils/contractors/columns';
import ExpandedRow from './ExpandedRow';

const CatalogTable = ({ data, handleChange }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const expandedRowRender = (record) => {
    return (
      <ExpandedRow
        record={record}
        isExpanded={expandedRowKeys.includes(record.key)}
      />
    );
  };

  const columns = contractorsColumns(handleChange);

  return (
    <Table
      columns={columns}
      dataSource={data}
      expandable={{
        expandedRowRender,
        expandedRowKeys,
        onExpand: (expanded, record) => {
          setExpandedRowKeys(expanded ? [record.key] : []);
        },
      }}
    />
  );
};

CatalogTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CatalogTable;
