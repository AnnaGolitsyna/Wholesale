import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Space, Radio } from 'antd';
import { ReactComponent as DifferentSizeIcon } from '../../../../styles/icons/size/DifferentSizeIcon.svg';

const CompanyNameFormatter = ({ onChange }) => {
  return (
    <Space
      direction="vertical"
      style={{
        padding: '0 10px',
        boxShadow: 'rgba(255, 253, 253, 0.5) 0 1px 3px 0 ',
      }}
    >
      <Space>
        <DifferentSizeIcon />
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
