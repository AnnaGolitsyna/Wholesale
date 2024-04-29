import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Space, theme } from 'antd';
import { DownCircleTwoTone } from '@ant-design/icons';
import { UpCircleTwoTone } from '@ant-design/icons';
import { paymentTypes } from '../../../../constants/paymentTypes';


const RadioGroup = ({ form, data }) => {
  const { token } = theme.useToken();
  const onChange = ({ target: { value } }) => {
    form.setFieldsValue({ type: value });
  };

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
        <Radio.Button value="credit">{paymentTypes.credit.text}</Radio.Button>
        <Radio.Button value="debet">{paymentTypes.debet.text}</Radio.Button>
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
