import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography, Space, Card, Divider } from 'antd';
import ReceivableTable from '../table/ReceivableTable';
import { boxStyle } from '../../../../styles/boxStyle';

const { Text } = Typography;

const DataDisplayCard = ({ icon, title, data, isLoading }) => {
  return (
    <>
      <Space
        direction="vertical"
        style={{ width: '100%', marginBottom: 10, ...boxStyle }}
        align="center"
      >
        {icon}
        <Text strong>{title}</Text>
      </Space>
      <ReceivableTable data={data} isLoading={isLoading} />
    </>
  );
};

DataDisplayCard.propTypes = {};

export default DataDisplayCard;
