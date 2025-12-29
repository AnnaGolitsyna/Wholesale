import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Card, Flex } from 'antd';
import { FORM_ACTIONS } from '../../../constants/formTypes';
import { ReactComponent as Orders } from '../../../styles/icons/orders/Orders.svg';
import useDeviceType from '../../../hook/useDeviceType';

/**
 * Responsive Title Component - shows different content based on device type
 * Mobile: Only contractor name and icon
 * Desktop: Full title with all elements
 */
const ResponsiveTitleSection = ({ actionType, data }) => {
  const { isMobile } = useDeviceType(768);

  const titleText = {
    [FORM_ACTIONS.EDIT]: 'Редактирование списка заказанных товаров',
    [FORM_ACTIONS.CREATE]: 'Создание списка заказанных товаров',
  };

  if (isMobile) {
    // Mobile: Show only icon and contractor name
    return (
      <Flex justify="space-between" align="center">
        <Orders style={{ width: 100, height: 100 }} />
        <Typography.Text strong style={{ fontSize: '16px', padding: 0 }}>
          {data?.name || data?.fullName || 'Не указано'}
        </Typography.Text>
        <Typography.Text strong style={{ fontSize: '16px', padding: 0 }}>
          {data?.id || 'Не указано'}
        </Typography.Text>
      </Flex>
    );
  }

  // Desktop: Show all elements
  return (
    <Flex justify="space-between" align="center">
      <Card>
        <Typography.Text strong style={{ fontSize: '16px', padding: 0 }}>
          {data?.name || data?.fullName || 'Не указано'}
        </Typography.Text>
      </Card>
      <Card>
        <Typography.Text strong style={{ fontSize: '16px', padding: 0 }}>
          {data?.id || 'Не указано'}
        </Typography.Text>
      </Card>
      <Orders style={{ width: 100, height: 100 }} />
      <Typography.Title level={4}>
        {titleText[actionType] || 'Просмотр списка заказов'}
      </Typography.Title>
    </Flex>
  );
};

ResponsiveTitleSection.propTypes = {
  actionType: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    fullName: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default ResponsiveTitleSection;
