import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Space } from 'antd';
import { operationTypes } from '../../../../constants/operationTypes';
import { ReactComponent as HappyBoss } from '../../../../styles/icons/money/HappyBoss.svg';
import { ReactComponent as SadBoss } from '../../../../styles/icons/money/SadBoss.svg';

const RadioGroup = ({ form, data }) => {
   const onChange = ({ target: { value } }) => {
    form.setFieldsValue({ type: value });
  };

  const creditText = operationTypes.payments.credit.text;
  const debetText = operationTypes.payments.debet.text;

  return (
    <Space style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <HappyBoss />

      <Radio.Group
        buttonStyle="solid"
        onChange={onChange}
        defaultValue={data?.type}
        size="large"
      >
        <Radio.Button value="credit">{creditText}</Radio.Button>
        <Radio.Button value="debet">{debetText}</Radio.Button>
      </Radio.Group>

      <SadBoss />
    </Space>
  );
};

RadioGroup.propTypes = {
  form: PropTypes.object.isRequired,
  data: PropTypes.object,
};

export default RadioGroup;
