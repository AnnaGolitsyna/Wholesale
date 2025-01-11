import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography } from 'antd';
import { myCompanysData } from '../../../../constants/companysData';

const PriceListHeader = ({ title }) => {
  const { name, phone, email } = myCompanysData;
  return (
    <>
      <Space style={{ display: 'flex' }}>
        <Typography.Text strong>{name}</Typography.Text>
        <Typography.Text>{`тел: ${phone}, e-mail: ${email}`}</Typography.Text>
      </Space>
      <Typography.Title level={3} style={{ textAlign: 'center' }}>
        {title}
      </Typography.Title>
    </>
  );
};

PriceListHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PriceListHeader;
