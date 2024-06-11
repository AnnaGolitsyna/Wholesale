import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Statistic, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { calculateValue } from './calculateValue';

const DynamicStatistic = ({ dataArray, name }) => {
  const { token } = theme.useToken();
  const form = Form.useFormInstance();

  const totalValue = Form.useWatch(dataArray, form)?.reduce((acc, item) => {
    return acc + calculateValue(name, item);
  }, 0);
  const priceType = Form.useWatch('priceType', form);

  useEffect(() => {
    form.setFieldsValue({ [name]: totalValue });
  }, [totalValue, priceType, name, form]);

  const isProfit = name === 'profit';

  return (
    <>
      <Form.Item name={name} noStyle>
        <Statistic
          value={totalValue}
          prefix={isProfit ? <PlusOutlined /> : null}
          valueStyle={{
            color: isProfit ? token.colorSuccessBg : null,
            fontSize: isProfit && '14px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        />
      </Form.Item>
    </>
  );
};

DynamicStatistic.propTypes = {
  dataArray: PropTypes.string.isRequired,
  name: PropTypes.oneOf(['sum', 'profit']).isRequired,
};

export default DynamicStatistic;
