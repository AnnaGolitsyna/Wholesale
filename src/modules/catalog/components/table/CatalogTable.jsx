import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import ExpandedRow from './ExpandedRow';

const CatalogTable = ({ data, columns, nestedColumns }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const expandedRowRender = (record) => {
    if (record.relatedCompanies.length === 0) return null;
    return (
      <ExpandedRow
        record={record.relatedCompanies}
        isExpanded={expandedRowKeys.includes(record.key)}
        nestedColumns={nestedColumns}
      />
    );
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered={true}
      showSorterTooltip={false}
      expandable={{
        expandedRowRender,
        expandedRowKeys,
        onExpand: (expanded, record) => {
          setExpandedRowKeys(expanded ? [record.key] : []);
        },
        rowExpandable: (record) =>
          record.relatedCompanies && record.relatedCompanies.length > 0,
      }}
      size="small"
      virtual
      scroll={{ scrollToFirstRowOnChange: true, y: '55vh', x: 1024 }}
      pagination={false}
    />
  );
};

CatalogTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  nestedColumns: PropTypes.array.isRequired,
};

export default CatalogTable;
