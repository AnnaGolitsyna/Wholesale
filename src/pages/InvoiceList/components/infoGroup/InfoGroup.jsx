import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Form, Space } from 'antd';
import TitleBlock from '../titleBlock/TitleBlock';

import DynamicProfit from '../dynamicProfit/DynamicProfit';
import RadioGroupForInvoice from '../radioGroup/RadioGroupForInvoice';

const InfoGroup = (props) => {

  const form = Form.useFormInstance();
  const { docType } = useParams();

  const dataArray = 'productList';

  const isProfit = docType === 'sale' && form.getFieldValue('type') === 'debet';

  return (
    <>
      <TitleBlock />
      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <RadioGroupForInvoice />
        {isProfit && <DynamicProfit dataArray={dataArray} />}
      </Space>
    </>
  );
};

InfoGroup.propTypes = {};

export default InfoGroup;
