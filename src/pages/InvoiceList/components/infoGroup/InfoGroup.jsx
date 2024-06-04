import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Form, Space } from 'antd';
import TitleBlockForInvoice from '../titleBlock/TitleBlockForInvoice';
import DynamicStatistic from '../dynamicStatistic/DynamicStatistic';
//import DynamicProfit from '../dynamicStatistic/DynamicProfit';
import RadioGroupForInvoice from '../radioGroup/RadioGroupForInvoice';

const InfoGroup = (props) => {

  const form = Form.useFormInstance();
  const { docType } = useParams();

  const dataArray = 'productList';

  const isProfit = docType === 'sale' && form.getFieldValue('type') === 'debet';

  return (
    <>
      <TitleBlockForInvoice />
      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <RadioGroupForInvoice />
        {/* {isProfit && <DynamicProfit dataArray={dataArray} />} */}
        {isProfit && (
          <DynamicStatistic
            dataArray="productList"
            name="profit"
            prefix="profit"
          />
        )}
      </Space>
    </>
  );
};

InfoGroup.propTypes = {};

export default InfoGroup;
