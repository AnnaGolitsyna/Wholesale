import React, { useState } from 'react';
import { Table } from 'antd';
import { contractorsColumns } from './tableColumnsContractor';
import ExpandedRow from './ExpandedRow';

const ContractorTable = ({ data, handleChange }) => {
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

export default ContractorTable;
