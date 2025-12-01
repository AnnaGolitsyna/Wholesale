import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, DatePicker, Button, Space, Typography, theme, Flex } from 'antd';
import { CalendarOutlined, SendOutlined } from '@ant-design/icons';
import { ReactComponent as Calendar } from '../../../../styles/icons/calendar/Calendar.svg';
import dayjs from 'dayjs';

const { Text } = Typography;

/**
 * TransferCard Component
 *
 * Displays a card with date picker and transfer button for filtered items
 * Only renders when there are filtered items available
 */
const TransferCard = ({
  filteredItems = [],
  contractorData = {},
  onTransfer,
}) => {
  const { token } = theme.useToken();
  const [transferDate, setTransferDate] = useState(dayjs());

  const handleTransfer = () => {
    const transferData = {
      contractor: contractorData,
      items: filteredItems,
      date: transferDate.format('YYYY-MM-DD'),
      timestamp: new Date().toISOString(),
    };

    console.log('=== ADD TO TRANSFER LIST ===');
    console.log('Contractor:', {
      id: contractorData?.id,
      name: contractorData?.name || contractorData?.fullName,
    });
    console.log('Transfer Date:', transferDate.format('DD.MM.YYYY'));
    console.log('Filtered Items:', filteredItems);
    console.log('Items Count:', filteredItems.length);
    console.log(
      'Total Units:',
      filteredItems.reduce((sum, item) => sum + (parseInt(item.count) || 0), 0)
    );
    console.log('============================');

    // Call parent handler if provided
    if (onTransfer) {
      onTransfer(transferData);
    }
  };

  // Don't render if no filtered items
  if (!filteredItems || filteredItems.length === 0) {
    return null;
  }

  const totalUnits = filteredItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card
      size="small"
      style={{
        marginTop: 16,
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        borderColor: token.colorPrimary,
        borderWidth: 2,
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* Header Info */}
        <Flex justify="space-between">
          <Flex justify="space-between" align="center">
            <Space direction="vertical" size={0}>
              <Text strong>Выбрано товаров:</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {filteredItems.length} позиций, {totalUnits} штук
              </Text>
            </Space>
          </Flex>
          <Calendar style={{ width: 150, height: 100 }} />
        </Flex>
        <Flex align="flex-end" justify="space-around">
          {/* Date Picker */}
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <Text type="secondary" >
              <CalendarOutlined /> Дата выхода
            </Text>
            <DatePicker
              value={transferDate}
              onChange={setTransferDate}
              // style={{ width: '100%' }}
              format="DD.MM.YYYY"
              placeholder="Выберите дату"
              allowClear={false}
            />
          </Space>

          {/* Transfer Button */}
          <Button type="text" icon={<SendOutlined />} onClick={handleTransfer}>
            Добавить в раскладку ({filteredItems.length})
          </Button>
        </Flex>
      </Space>
    </Card>
  );
};

TransferCard.propTypes = {
  filteredItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      label: PropTypes.string,
      count: PropTypes.number.isRequired, // ✅ Now strictly number
    })
  ),
  contractorData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    fullName: PropTypes.string,
  }),
  onTransfer: PropTypes.func,
};

export default TransferCard;
