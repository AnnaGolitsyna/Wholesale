import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Space, theme } from 'antd';
import { DownCircleTwoTone } from '@ant-design/icons';
import { UpCircleTwoTone } from '@ant-design/icons';
import { operationTypes } from '../../../../constants/operationTypes';


const RadioGroup = ({ form, data }) => {
  const { token } = theme.useToken();
  const onChange = ({ target: { value } }) => {
    form.setFieldsValue({ type: value });
  };

  const creditText = operationTypes.payments.credit.text;
  const debetText = operationTypes.payments.debet.text;

  return (
    <Space style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <DownCircleTwoTone
        twoToneColor={token.colorSuccessBg}
        style={{ fontSize: 40 }}
      />
      <Radio.Group
        buttonStyle="solid"
        onChange={onChange}
        defaultValue={data?.type}
        size="large"
      >
        <Radio.Button value="credit">{creditText}</Radio.Button>
        <Radio.Button value="debet">{debetText}</Radio.Button>
      </Radio.Group>
      <UpCircleTwoTone
        twoToneColor={token.colorWarningBg}
        style={{ fontSize: 40 }}
      />
    </Space>
  );
};

RadioGroup.propTypes = {
  form: PropTypes.object.isRequired,
  data: PropTypes.object,
};

export default RadioGroup;
