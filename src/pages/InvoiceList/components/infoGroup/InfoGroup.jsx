import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Space } from 'antd';
import TitleBlockForInvoice from '../titleBlock/TitleBlockForInvoice';
import DynamicStatistic from '../dynamicStatistic/DynamicStatistic';
import RadioGroupForInvoice from '../radioGroup/RadioGroupForInvoice';

const InfoGroup = ({ arrayName }) => {
  const form = Form.useFormInstance();
  const { docType } = useParams();

  const isProfit = docType === 'sale' && form.getFieldValue('type') === 'debet';

  return (
    <>
      <TitleBlockForInvoice />
      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <RadioGroupForInvoice />

        {isProfit && (
          <DynamicStatistic
            dataArray={arrayName}
            name="profit"
            prefix="profit"
          />
        )}
      </Space>
    </>
  );
};

InfoGroup.propTypes = {
  arrayName: PropTypes.string.isRequired,
};

export default InfoGroup;
