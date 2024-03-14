import React from 'react';
import PropTypes from 'prop-types'
import { Typography, Space, Radio } from 'antd';
import NewContractorIcon from '../../../../styles/icons/NewContractorIcon';

const FormattedCompanyData = ({ onChange }) => {
  return (
    <Space direction="vertical">
      <Space>
        <NewContractorIcon />
        <Typography.Text strong>Данные о компании:</Typography.Text>
      </Space>
      <Radio.Group onChange={onChange} defaultValue={'short'}>
        <Radio value={'short'}>Краткий формат</Radio>
        <Radio value={'full'}>Полный формат</Radio>
      </Radio.Group>
    </Space>
  );
};

FormattedCompanyData.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default FormattedCompanyData;
