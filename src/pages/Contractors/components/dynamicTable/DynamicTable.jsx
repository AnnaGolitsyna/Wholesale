import React from 'react';
import PropTypes from 'prop-types';
import { Form, Typography, Table } from 'antd';

/**
 * Generic dynamic table component for forms
 * Can be used for any type of list data (relatedCompanies, listOrderedItems, etc.)
 * 
 * @param {string} name - Form field name
 * @param {Array} columns - Ant Design table columns configuration
 * @param {string} emptyText - Text to show when list is empty
 * @param {Function} sortData - Optional sort function for data
 * @param {boolean} disabled - Whether table is read-only
 * @param {Object} tableProps - Additional props to pass to Ant Design Table
 */
const DynamicTable = ({ 
  name, 
  columns, 
  emptyText = 'Нет данных',
  sortData = null,
  disabled = false,
  tableProps = {}
}) => {
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues[name] !== currentValues[name]
      }
    >
      {({ getFieldValue }) => {
        let dataList = getFieldValue(name);

        // Apply sorting if provided
        if (sortData && dataList?.length) {
          dataList = [...dataList].sort(sortData);
        }

        return (
          <Form.Item name={name} noStyle>
            {dataList?.length ? (
              <Table
                dataSource={dataList}
                columns={disabled ? columns.map(col => ({
                  ...col,
                  // Disable any editable cells or actions in columns
                  onCell: undefined,
                  render: col.render || ((text) => text),
                })) : columns}
                pagination={false}
                size="small"
                className={disabled ? 'table-disabled' : ''}
                {...tableProps}
                // Override props if disabled
                {...(disabled && {
                  rowSelection: undefined,
                })}
              />
            ) : (
              <Typography.Text code>{emptyText}</Typography.Text>
            )}
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

DynamicTable.propTypes = {
  name: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyText: PropTypes.string,
  sortData: PropTypes.func,
  disabled: PropTypes.bool,
  tableProps: PropTypes.object,
};

export default DynamicTable;
