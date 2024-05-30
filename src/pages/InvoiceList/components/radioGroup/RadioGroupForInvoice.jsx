import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Radio, Form, Typography, Space } from 'antd';
import FileIcon from '../../../../styles/icons/FileIcon';
import useInvoiceStyleByType from '../../hook/useInvoiceStyleByType';

const RadioGroupForInvoice = () => {
  const form = Form.useFormInstance();
  // const [invoiceType, setInvoiceType] = useState(null);
  const { type } = useParams();
  const { modalDetails } = useInvoiceStyleByType(type);

  console.log(
    'modalDetails',
    modalDetails,
    modalDetails[form.getFieldValue('type')]
  );

  const handleChange = (e) => {
    console.log(e.target.value);
    // setInvoiceType(e.target.value);
    form.setFieldsValue({ type: e.target.value });
  };
  const title = form.getFieldValue('type')
    ? modalDetails[form.getFieldValue('type')].titleText
    : 'Выберите тип документа';
  return (
    <>
      <Space>
        <FileIcon />
        <Typography.Title level={3}>{title}</Typography.Title>
      </Space>
      <Radio.Group
        buttonStyle="solid"
        onChange={handleChange}
        // defaultValue={null}
      >
        <Radio.Button value="debet">
          {modalDetails.debet.radioBtnText}
        </Radio.Button>
        <Radio.Button value="credit">
          {modalDetails.credit.radioBtnText}
        </Radio.Button>
      </Radio.Group>
    </>
  );
};

RadioGroupForInvoice.propTypes = {};

export default RadioGroupForInvoice;
