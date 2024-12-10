import React from 'react';
import { Radio, Form } from 'antd';
import useInvoiceStyleByType from '../../../../hook/useInvoiceStyleByType';
import {OPERATION_TYPES} from '../../../../constants/operationTypes';

const RadioGroupForInvoice = () => {
  const form = Form.useFormInstance();
  const { modalDetails } = useInvoiceStyleByType();

  const handleTypeChange = ({ target: { value } }) => {
    form.setFieldsValue({ type: value });
  };

  return (
    <Radio.Group
      buttonStyle="solid"
      onChange={handleTypeChange}
      defaultValue={form.getFieldValue('type') ?? null}
    >
      <Radio.Button value={OPERATION_TYPES.DEBET}>
        {modalDetails.debet.radioBtnText}
      </Radio.Button>
      <Radio.Button value={OPERATION_TYPES.CREDIT}>
        {modalDetails.credit.radioBtnText}
      </Radio.Button>
    </Radio.Group>
  );
};

export default RadioGroupForInvoice;
