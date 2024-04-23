import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Space } from 'antd';
import DownloadIconSvg from '../../../../styles/icons/DownloadIcon';
import UploadIcon from '../../../../styles/icons/UploadIcon';
import { paymentTypes } from '../../../../constants/paymentTypes';

const RadioGroup = ({ form, data }) => {
  const onChange = ({ target: { value } }) => {
    form.setFieldsValue({ type: value });
  };
  return (
    <Space style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <DownloadIconSvg />
      <Radio.Group
        buttonStyle="solid"
        onChange={onChange}
        defaultValue={data?.type}
        size="large"
      >
        <Radio.Button value="credit">{paymentTypes.credit.text}</Radio.Button>
        <Radio.Button value="debet">{paymentTypes.debet.text}</Radio.Button>
      </Radio.Group>
      <UploadIcon />
    </Space>
  );
};

RadioGroup.propTypes = {
  form: PropTypes.object.isRequired,
  data: PropTypes.object,
};

export default RadioGroup;
