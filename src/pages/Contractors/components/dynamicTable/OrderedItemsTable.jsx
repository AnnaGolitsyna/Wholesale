import React from 'react';
import PropTypes from 'prop-types';
import { Form, Typography, Tag } from 'antd';
import EditableTable from '../../../../components/editableTable/EditableTable';
import { getOrderedItemsColumns } from '../../utils/getOrderedItemsColumns';

const OrderedItemsTable = ({ name = 'listOrderedItems', disabled = false }) => {
  const form = Form.useFormInstance();

  // ✅ Move handleSave outside to use form.getFieldValue
  const handleSave = (row) => {
    const dataList = form.getFieldValue(name) || [];

    const newData = dataList.map((item) =>
      item.key === row.key ? { ...item, ...row } : item
    );

    form.setFieldsValue({
      [name]: newData,
    });
  };

  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues[name] !== currentValues[name]
      }
    >
      {({ getFieldValue }) => {
        const dataSource = getFieldValue(name) || [];

        // ✅ No useMemo - just compute directly in render
        const baseColumns = getOrderedItemsColumns(dataSource);

        const columns = disabled
          ? baseColumns
          : baseColumns.map((col) => {
              if (col.key === 'count') {
                return {
                  ...col,
                  editable: true,
                  render: (count) => <Tag bordered={false}>{count} шт</Tag>,
                };
              }
              return col;
            });

        if (!dataSource.length) {
          return (
            <Typography.Text code>
              Список заказанных товаров пуст
            </Typography.Text>
          );
        }

        return (
          <Form.Item name={name} noStyle>
            <EditableTable
              dataSource={dataSource}
              defaultColumns={columns}
              handleSave={handleSave}
            />
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

OrderedItemsTable.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export { OrderedItemsTable };
