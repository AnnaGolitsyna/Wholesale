import React from 'react';
import PropTypes from 'prop-types';
import { Form, Typography } from 'antd';
import EditableTable from '../../../../components/editableTable/EditableTable';
import { getOrderedItemsColumns } from '../../utils/getOrderedItemsColumns';

const OrderedItemsTable = ({ name = 'listOrderedItems', disabled = false }) => {
  const form = Form.useFormInstance();

  const handleSave = (row) => {
    const dataList = form.getFieldValue(name) || [];
    const newData = dataList.map((item) =>
      item.key === row.key ? { ...item, ...row } : item
    );
    form.setFieldsValue({ [name]: newData });
  };

  const handleDelete = (key) => {
    const dataList = form.getFieldValue(name) || [];
    const newData = dataList.filter((item) => item.key !== key);
    form.setFieldsValue({ [name]: newData });
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
        const columns = getOrderedItemsColumns(dataSource, handleDelete);

        if (!dataSource.length) {
          return (
            <Typography.Text code>
              Список заказанных товаров пуст
            </Typography.Text>
          );
        }

        return (
          <EditableTable
            dataSource={dataSource}
            defaultColumns={columns}
            handleSave={handleSave}
            onChange={(pagination, filters, sorter, extra) => {
              // ✅ Store filtered items keys in form state
              const filteredKeys = extra.currentDataSource.map(
                (item) => item.key
              );

              // Update form with filtered keys
              form.setFieldsValue({
                filteredItemsKeys: filteredKeys,
              });
            }}
          />
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
