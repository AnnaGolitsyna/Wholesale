import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Alert, Typography, Divider } from 'antd';

const AlertEmptyData = ({name}) => {
  const alertMessage = (
    <Flex vertical align="center">
      <Typography.Title level={4}>
        В указанный период у {name} нет транзакций.
      </Typography.Title>
      <Divider />
      <Flex vertical align="center">
        <Typography.Text style={{ fontStyle: 'italic' }}>
          Информацию о последней сохраненной транзакции можно увидеть в
        </Typography.Text>

        <Typography.Link underline italic>
          истории транзакций
        </Typography.Link>
      </Flex>

      <Divider />
    </Flex>
  );
  return <Alert message={alertMessage} type="info" />;
};

AlertEmptyData.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AlertEmptyData;
