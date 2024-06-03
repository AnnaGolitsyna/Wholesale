import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Radio, Form, Typography, Space, Statistic } from 'antd';
import TitleBlock from '../titleBlock/TitleBlock';
import useInvoiceStyleByType from '../../hook/useInvoiceStyleByType';
import DynamicProfit from '../dynamicProfit/DynamicProfit';
import RadioGroupForInvoice from '../radioGroup/RadioGroupForInvoice';

const InfoGroup = (props) => {
  const form = Form.useFormInstance();
   const { docType } = useParams();
  const { modalDetails } = useInvoiceStyleByType();
  const dataArray = 'productList';
  const title = form.getFieldValue('type')
    ? modalDetails[form.getFieldValue('type')].titleText
    : 'Выберите тип документа';

  const docNumber = form.getFieldValue('docNumber')
    ? `№ ${form.getFieldValue('docNumber')}`
    : '';

  const isProfit = docType === 'sale' && form.getFieldValue('type') === 'debet'; ;

  return (
    <>
      <TitleBlock title={title} docNumber={docNumber} />
      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <RadioGroupForInvoice />
        {isProfit && <DynamicProfit dataArray={dataArray} />}
      </Space>
    </>
  );
};

InfoGroup.propTypes = {};

export default InfoGroup;
