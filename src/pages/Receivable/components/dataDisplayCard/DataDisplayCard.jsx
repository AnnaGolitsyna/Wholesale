import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Space, Flex } from 'antd';
import ReceivableTable from '../table/ReceivableTable';
import { boxStyle } from '../../../../styles/boxStyle';

const { Text } = Typography;

const DataDisplayCard = ({ icon, title, data, isLoading, color }) => {
  return (
    <Flex vertical align="center">
      <Text
        strong
        style={{
          width: '100%',
          textAlign: 'center',
          marginBottom: 10,
          backgroundColor: color,
          ...boxStyle,
        }}
      >
        {title}
      </Text>
      <ReceivableTable data={data} isLoading={isLoading} />
      <Space style={{ marginTop: 10 }}>{icon}</Space>
    </Flex>
  );
};

DataDisplayCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
};

export default DataDisplayCard;
