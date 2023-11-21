import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import ExpandedRow from './ExpandedRow';

const CatalogTable = ({ data, columns, nestedColumns }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const expandedRowRender = (record) => {
    return (
      <ExpandedRow
        record={record}
        isExpanded={expandedRowKeys.includes(record.key)}
        nestedColumns={nestedColumns}
      />
    );
  };

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
  columns: PropTypes.array.isRequired,
  nestedColumns: PropTypes.array.isRequired,
};

export default CatalogTable;