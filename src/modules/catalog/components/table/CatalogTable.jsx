import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import ExpandedRow from './ExpandedRow';

const CatalogTable = ({ data, columns, nestedColumns }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const children = ['relatedCompanies', 'productList'];

  const expandedRowRender = (record) => {
    const relatedData = children.reduce((acc, child) => {
      if (record[child] && record[child].length > 0) {
        acc = record[child];
      }
      return acc;
    }, null);


    if (!relatedData?.length) return null;

    return (
      <ExpandedRow
        record={relatedData}
        isExpanded={expandedRowKeys.includes(record.key)}
        nestedColumns={nestedColumns}
      />
    );
  };

  const isExpandable = (record, properties) => {
    return properties.some(
      (property) => record[property] && record[property].length > 0
    );
  };



  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      showSorterTooltip={false}
      expandable={{
        expandedRowRender,
        expandedRowKeys,
        columnWidth: 40,
        onExpand: (expanded, record) => {
          setExpandedRowKeys(expanded ? [record.key] : []);
        },
        rowExpandable: (record) => isExpandable(record, children),
      }}
      size="small"
      virtual
      scroll={{ scrollToFirstRowOnChange: true, y: 400, x: 1024 }}
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
