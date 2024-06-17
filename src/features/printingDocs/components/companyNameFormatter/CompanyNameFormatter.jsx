import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Space, Radio } from 'antd';
import { ReactComponent as NewContractorIcon } from '../../../../styles/icons/users/NewUserIcon.svg';

const CompanyNameFormatter = ({ onChange }) => {
  return (
    <Space direction="vertical">
      <Space>
        <NewContractorIcon />
        <Typography.Text strong>Данные о компании:</Typography.Text>
      </Space>
      <Radio.Group onChange={onChange} defaultValue={'shortName'}>
        <Radio value={'shortName'}>Краткий формат</Radio>
        <Radio value={'fullName'}>Полный формат</Radio>
      </Radio.Group>
    </Space>
  );
};

CompanyNameFormatter.propTypes = {
  onChange: PropTypes.func,
};

export default CompanyNameFormatter;
