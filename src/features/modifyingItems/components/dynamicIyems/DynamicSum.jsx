import React from 'react';
import PropTypes from 'prop-types';
import { Form, Typography, Table, Input, Statistic } from 'antd';

const DynamicSum = (props) => {
  const form = Form.useFormInstance();
  const { name } = props;
  const dataArray = 'productList';
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) => {
        //   const test =  currentValues?.some((item) => {
        //       const foundItem = prevValues?.includes(item.key)
        //       return item.count !== foundItem.count || item.selectedPrice !== foundItem.selectedPrice
        //     })
        const prevProductList = prevValues[dataArray] || [];
        const currentProductList = currentValues[dataArray] || [];

        const hasChanges = currentProductList.some((item, index) => {
          const prevItem = prevProductList[index];

          return prevItem
            ? item.count !== prevItem.count ||
                item.selectedPrice !== prevItem.selectedPrice
            : true;
        });
        // console.log(
        //   'shouldUpdate',
        //   prevValues,
        //   currentValues,
        //   currentValues?.productList,
        //   hasChanges
        // );

        return hasChanges;
        // if (prevValues.productList?.count !== currentValues.productList?.count) {
        //   return true;
        // }
        // if (prevValues.productList?.selectedPrice !== currentValues.productList?.selectedPrice) {
        //   return true;
        // }
      }}
    >
      {({ getFieldValue }) => {
        const sum = getFieldValue(dataArray)?.reduce((acc, item) => {
          return acc + item.selectedPrice * item.count;
        }, 0);
        // console.log('getSum', getFieldValue(dataArray), sum, name);
        form.setFieldsValue({
          [name]: sum,
          // sum,
        });

        return (
          <Form.Item name={name} noStyle>
            <Statistic
              value={sum}
              precision={2}
              valueStyle={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
            />
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

DynamicSum.propTypes = {};

export default DynamicSum;
