import React from 'react';
import PropTypes from 'prop-types';
import { Form, Statistic, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { calculateValue } from './calculateValue';

const DynamicStatistic = ({ dataArray, name, prefix }) => {
  const form = Form.useFormInstance();
  const { token } = theme.useToken();

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
                item.selectedPrice !== prevItem.selectedPrice ||
                (prefix === 'profit' && item.cost !== prevItem.cost)
            : true;
        });

        return hasChanges;
      }}
    >
      {({ getFieldValue }) => {
        const value = getFieldValue(dataArray)?.reduce((acc, item) => {
          return acc + calculateValue(prefix, item);
        }, 0);

        form.setFieldsValue({
          [name]: value,
        });
        return (
          <Form.Item name={name} noStyle>
            <Statistic
              value={value}
              precision={2}
              prefix={prefix === 'profit' ? <PlusOutlined /> : null}
              valueStyle={{
                color: prefix === 'profit' ? token.colorSuccessBg : null,
                fontSize: prefix === 'profit' && '14px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

DynamicStatistic.propTypes = {
  dataArray: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  prefix: PropTypes.oneOf(['sum', 'profit']).isRequired,
};

export default DynamicStatistic;
