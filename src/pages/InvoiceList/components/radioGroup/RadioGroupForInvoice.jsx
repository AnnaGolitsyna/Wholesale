import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Form } from 'antd';
import useInvoiceStyleByType from '../../hook/useInvoiceStyleByType';

const RadioGroupForInvoice = () => {
  const form = Form.useFormInstance();

  const { modalDetails } = useInvoiceStyleByType();

  const handleChange = (e) => {
    form.setFieldsValue({ type: e.target.value });
  };

  return (
    <>
      <Radio.Group
        buttonStyle="solid"
        onChange={handleChange}
        defaultValue={form.getFieldValue('type') || null}
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
