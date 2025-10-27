import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Space } from 'antd';
import TitleBlockForInvoice from '../titleBlock/TitleBlockForInvoice';
import DynamicStatistic from '../dynamicStatistic/DynamicStatistic';
import RadioGroupForInvoice from '../radioGroup/RadioGroupForInvoice';
import { OPERATION_TYPES } from '../../../../constants/operationTypes';

const InfoGroup = ({ arrayName }) => {
  const form = Form.useFormInstance();
  const { docType } = useParams();

  const isProfit =
    docType === OPERATION_TYPES.SALE &&
    form.getFieldValue('type') === OPERATION_TYPES.DEBET;

  return (
    <>
      <Form.Item
        name="type"
        rules={[{ required: true, message: 'Выберите тип операции' }]}
      >
        <TitleBlockForInvoice />
      </Form.Item>
      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <RadioGroupForInvoice />
        {isProfit && <DynamicStatistic dataArray={arrayName} name="profit" />}
      </Space>
    </>
  );
};

InfoGroup.propTypes = {
  arrayName: PropTypes.string.isRequired,
};

export default InfoGroup;
