import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Typography, Table, Input, Statistic } from 'antd';
import { getProductListColumns } from '../../../../pages/InvoiceList/utils/getProductListColumns';
import EditableTable from '../../../../components/editableTable/EditableTable';

const DynamicTable = (props) => {
  const [selectedPrice, setSelectedPrice] = useState(0);
  const form = Form.useFormInstance();
  // console.log('props', props, props.name, form.getFieldValue('type'));
  const { name } = props;
  const dataArray = 'productList';
  const columns = getProductListColumns(form);

  // const [count, setCount] = useState(2);

  const handleSave = (row) => {
    const dataList = form
      .getFieldValue(dataArray)
      .map((item) => (item.key === row.key ? row : item));
    // {
    //   if (item.key === row.key) {
    //     return row;
    //   }
    //   return item;
    // }) || [];
    console.log('handleSave', row, dataList);

    form.setFieldsValue({
      [dataArray]: [...dataList],
    });
  };

  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) => {

        setSelectedPrice(currentValues.priceType?.value);
        return (
          prevValues[dataArray] !== currentValues[dataArray] ||
          prevValues.priceType?.value !== currentValues.priceType?.value
        );
      }}
    >
      {({ getFieldValue }) => {
        const dataList = getFieldValue(dataArray)?.map((item) => {
          console.log('item', item, selectedPrice, item[selectedPrice]);
          return { ...item, selectedPrice: item[selectedPrice] };
        });
        // .sort(
        //   (a, b) => b.active - a.active
        // );
      //  console.log('dataList', dataList);

        return (
          <Form.Item name={name} noStyle>
            {dataList?.length ? (

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
  dataArray: PropTypes.string.isRequired,
  // columns: PropTypes.array.isRequired,
};

export default DynamicTable;
