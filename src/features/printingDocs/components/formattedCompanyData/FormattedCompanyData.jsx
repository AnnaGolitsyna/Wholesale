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
      <Radio.Group onChange={onChange} defaultValue={'shortName'}>
        <Radio value={'shortName'}>Краткий формат</Radio>
        <Radio value={'fullName'}>Полный формат</Radio>
      </Radio.Group>
    </Space>
  );
};

FormattedCompanyData.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default FormattedCompanyData;
