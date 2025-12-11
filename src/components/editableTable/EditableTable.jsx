import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import EditableCell from './EditableCell';
import { EditableRow } from './EditableRow';

const EditableTable = ({
  dataSource,
  defaultColumns,
  handleSave,
  rowSelection,
  onChange, // ✅ Add this prop
}) => {
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        };
      },
    };
  });

  return (
    <Table
      rowKey="key"
      rowSelection={rowSelection}
      dataSource={dataSource}
      columns={columns}
      size="small"
      pagination={false}
      components={components}
      rowClassName={() => 'editable-row'}
      onChange={onChange} // ✅ Pass it to the Table
    />
  );
};

EditableTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  defaultColumns: PropTypes.array.isRequired,
  handleSave: PropTypes.func.isRequired,
  rowSelection: PropTypes.object,
  onChange: PropTypes.func, // ✅ Add to PropTypes
};

export default EditableTable;
