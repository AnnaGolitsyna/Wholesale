import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import ExpandedRow from './ExpandedRow';

const CatalogTable = ({ data, columns, nestedColumns }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const findNameExpandedRowRender = (list) => {
    return list.reduce((result, el) => {
      const keyWithArray = Object.keys(el).find((key) =>
        Array.isArray(el[key])
      );

      return keyWithArray && !result.includes(keyWithArray)
        ? (result += keyWithArray)
        : result;

    }, '');
  };


  //console.log('test', data, findNameExpandedRowRender(data));

  const expandedRowRender = (record) => {
    if (record.relatedCompanies.length === 0) return null;
    return (
      <ExpandedRow
        //  record={record}
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
      scroll={{ scrollToFirstRowOnChange: true, y: '55vh', x: 1024 }}
      pagination={false}
    />
  );
};

CatalogTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  // nestedColumns: PropTypes.array.isRequired,
};

export default CatalogTable;
