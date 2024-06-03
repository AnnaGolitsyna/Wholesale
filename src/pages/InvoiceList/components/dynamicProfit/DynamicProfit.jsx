import React from 'react';
import PropTypes from 'prop-types';
import { Form, Statistic } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const DynamicProfit = ({dataArray}) => {
  const form = Form.useFormInstance();
 
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) => {
        const prevProductList = prevValues[dataArray] || [];
        const currentProductList = currentValues[dataArray] || [];

        const hasChanges = currentProductList.some((item, index) => {
          const prevItem = prevProductList[index];

          return prevItem
            ? item.count !== prevItem.count ||
                item.selectedPrice !== prevItem.selectedPrice
            : true;
        });

        return hasChanges;
      }}
    >
      {({ getFieldValue }) => {
        const profit = getFieldValue(dataArray)?.reduce((acc, item) => {
          const sum = item.selectedPrice * item.count;
          const profit = sum - item.cost * item.count;
          return acc + profit;
        }, 0);
        console.log('getProfit', getFieldValue(dataArray), profit);
        form.setFieldsValue({
          profit,
        });

        return (
          <Form.Item name={'profit'} noStyle>
            <Statistic
              value={profit}
              precision={2}
              prefix={<PlusOutlined />}
              valueStyle={{
                color: '#87d068',
                fontSize: '14px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

DynamicProfit.propTypes = {};

export default DynamicProfit;
