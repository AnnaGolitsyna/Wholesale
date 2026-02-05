import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'antd';
import EditableTable from '../../../../components/editableTable/EditableTable';
import { getProductListColumns } from '../../utils/getProductListColumns';
import { parseWithDots } from '../../../../utils/priceUtils';

const DynamicTable = ({ name, compact = false }) => {
  const form = Form.useFormInstance();

  const handleDelete = (key) => {
    const dataList = form
      .getFieldValue(name)
      .filter((item) => item.key !== key);

    form.setFieldsValue({
      [name]: [...dataList],
    });
  };

  const handleSave = (row) => {
    const parsedPrice = parseWithDots(row.selectedPrice);

    const dataList = form
      .getFieldValue(name)
      .map((item) =>
        item.key === row.key ? { ...row, selectedPrice: parsedPrice } : item,
      );

    form.setFieldsValue({
      [name]: [...dataList],
    });
  };

  const shouldUpdateData = (prevValues, currentValues) => {
    return prevValues[name] !== currentValues[name];
  };

  const shouldUpdatePriceType = (prevValues, currentValues) => {
    return prevValues.priceType?.value !== currentValues.priceType?.value;
  };

  const handleShouldUpdate = (prevValues, currentValues) => {
    return (
      shouldUpdatePriceType(prevValues, currentValues) ||
      shouldUpdateData(prevValues, currentValues)
    );
  };

  const columns = getProductListColumns(form, handleDelete, compact);

  return (
    <Form.Item noStyle shouldUpdate={handleShouldUpdate}>
      {({ getFieldValue }) => {
        const dataList = getFieldValue(name) || [];

        return (
          <Form.Item name={name} noStyle>
            {dataList.length ? (
              <EditableTable
                dataSource={dataList}
                defaultColumns={columns}
                handleSave={handleSave}
              />
            ) : (
              <Table dataSource={[]} columns={columns} />
            )}
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

DynamicTable.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DynamicTable;
