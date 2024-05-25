import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Typography, Table, Input, Statistic } from 'antd';
import { getProductListColumns } from '../../../../pages/InvoiceList/utils/getProductListColumns';
import EditableTable from '../../../../components/editableTable/EditableTable';

const DynamicTable = (props) => {
  const form = Form.useFormInstance();
  const { name } = props;
  const dataArray = 'productList';
  const columns = getProductListColumns(form);

  const handleSave = (row) => {
    const dataList = form
      .getFieldValue(dataArray)
      .map((item) => (item.key === row.key ? row : item));

    console.log('handleSave', row, dataList);

    form.setFieldsValue({
      [dataArray]: [...dataList],
    });
  };

  const shouldUpdateDataArray = (prevValues, currentValues) => {
    console.log('suProductList', prevValues, currentValues);
    return prevValues[dataArray] !== currentValues[dataArray];
  };

  const shouldUpdatePriceType = (prevValues, currentValues) => {
    const newProductList = currentValues?.productList?.map((item) => {
      console.log(
        'test',
        currentValues.priceType?.value,
        item[currentValues.priceType?.value]
      );
      return {
        ...item,
        selectedPrice: item[currentValues.priceType?.value],
      };
    });
    console.log(
      'suPriceType',
      prevValues.priceType?.value,
      prevValues,
      currentValues.priceType?.value,
      currentValues,
      'new',
      newProductList
    );
    // const newValue = {
    //   ...currentValues,
    //   productList: newProductList,
    // };

    form.setFieldsValue({
      productList: [...newProductList],
    });
    //  console.log('dataList', dataList);
    return prevValues.priceType?.value !== currentValues.priceType?.value;
  };

  const handleShouldUpdate = (prevValues, currentValues) => {
    return prevValues.priceType?.value !== currentValues.priceType?.value
      ? shouldUpdatePriceType(prevValues, currentValues)
      : shouldUpdateDataArray(prevValues, currentValues);
    // return (
    //   shouldUpdateDataArray(prevValues, currentValues) ||
    //   shouldUpdatePriceType(prevValues, currentValues)
    // );
  };

  return (
    <Form.Item noStyle shouldUpdate={handleShouldUpdate}>
      {({ getFieldValue }) => {
        const dataList = getFieldValue(dataArray);
        // const dataList = getFieldValue(dataArray)?.map((item) => {
        //   const selectedPriceType = form.getFieldValue('priceType').value;
        //   // console.log(
        //   //   'item',
        //   //   item,
        //   //   selectedPriceType,
        //   //   item[selectedPriceType],
        //   //   item.selectedPrice
        //   // );

        //   /// Doesn't work ---- TO RUMINATE!!!!!!
        //   const newPrice =
        //     item[selectedPriceType] !== item.selectedPrice
        //       ? item.selectedPrice
        //       : item[selectedPriceType];

        //   return { ...item, selectedPrice: newPrice };
        //   // return item;
        // });
        // // form.setFieldsValue({
        // //   [dataArray]: [...dataList],
        // // });
        console.log('dataList', dataList);

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
