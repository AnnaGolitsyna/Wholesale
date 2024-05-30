import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Radio, Form } from 'antd';
import useInvoiceStyleByType from '../../hook/useInvoiceStyleByType';

const RadioGroupForInvoice = () => {
  const form = Form.useFormInstance();
  // const [invoiceType, setInvoiceType] = useState(null);
  const { type } = useParams();
  const { modalDetails } = useInvoiceStyleByType(type);

  const handleChange = (e) => {
    console.log(e.target.value);
    // setInvoiceType(e.target.value);
    form.setFieldsValue({ type: e.target.value });
  };
  return (
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
  );
};

RadioGroupForInvoice.propTypes = {};

export default RadioGroupForInvoice;
