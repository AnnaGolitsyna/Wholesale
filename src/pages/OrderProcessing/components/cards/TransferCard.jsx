import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  DatePicker,
  Button,
  Space,
  Typography,
  theme,
  Flex,
  message,
} from 'antd';
import { CalendarOutlined, SendOutlined } from '@ant-design/icons';
import { ReactComponent as Calendar } from '../../../../styles/icons/calendar/Calendar.svg';
import { createTransfer } from '../../api/transfers_operations';
import ModalUserError from '../../../../components/modals/ModalUserError';
import { useErrorHandling } from '../../../../features/modifyingItems/hook/useErrorHandling';

const { Text } = Typography;

/**
 * TransferCard Component
 *
 * Displays a card with date picker and transfer button for filtered items
 * Only renders when there are filtered items available
 */
const TransferCard = ({ filteredItems = [], contractorData = {} }) => {
  const { token } = theme.useToken();
  const [transferDate, setTransferDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { userError, handleError, clearErrors } = useErrorHandling();

  const handleTransfer = async () => {
    // ✅ Validate that date is selected
    if (!transferDate) {
      messageApi.warning({
        content: 'Пожалуйста, выберите дату выхода',
        duration: 3,
      });
      return;
    }

    try {
      setLoading(true);

      // ✅ Create a clean transfer object with ONLY the fields we want
      const transferData = {
        date: transferDate.format('YYYY-MM-DD'),
        timestamp: new Date().toISOString(),
        contractor: {
          id: contractorData?.id,
          name: contractorData?.name || contractorData?.fullName,
        },
        items: filteredItems.map((item) => ({
          productId: item.value,
          productName: item.label,
          count: item.count,
        })),
        scedule: filteredItems[0]?.scedule || null,
      };

      // Create transfer in Firebase
      await createTransfer(transferData);

      messageApi.success({
        content: 'Список добавлен в раскладку',
        duration: 3,
      });
      console.log('✅ Transfer created successfully');
    } catch (error) {
      console.error('❌ Failed to create transfer:', error);
      handleError(error);
      messageApi.error({
        content: 'Ошибка при добавлении в раскладку',
        duration: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  // Don't render if no filtered items
  if (!filteredItems || filteredItems.length === 0) {
    return null;
  }

  const totalUnits = filteredItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <>
      {contextHolder}
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
        <Flex justify="space-between" align="center">
          <Space direction="vertical" size={0}>
            <Text strong>Выбрано товаров:</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {filteredItems.length} позиций, {totalUnits} штук
            </Text>
          </Space>
          <Calendar style={{ width: 150, height: 100 }} />
        </Flex>

        {/* Date Picker and Transfer Button */}
        <Flex align="flex-end" justify="space-between" gap="middle">
          <Space direction="vertical" size={4} style={{ flex: 1 }}>
            <Text type="secondary">
              <CalendarOutlined /> Дата выхода <Text type="danger">*</Text>
            </Text>
            <DatePicker
              value={transferDate}
              onChange={setTransferDate}
              format="DD.MM.YYYY"
              placeholder="Выберите дату"
              allowClear={false}
              disabled={loading}
              style={{ width: '100%' }}
              status={!transferDate ? 'error' : ''}
              cellRender={(current, info) => {
                if (info.type !== 'date') return info.originNode;
                if (current.year() === new Date().getFullYear()) return info.originNode;
                return (
                  <div className="ant-picker-cell-inner" style={{ color: '#b30002' }}>
                    {current.date()}
                  </div>
                );
              }}
            />
          </Space>

          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleTransfer}
            loading={loading}
            disabled={loading || !transferDate}
          >
            Добавить в раскладку ({filteredItems.length})
          </Button>
        </Flex>
      </Space>
    </Card>
    {userError && <ModalUserError error={userError} onClose={clearErrors} />}
    </>
  );
};

TransferCard.propTypes = {
  filteredItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      label: PropTypes.string,
      count: PropTypes.number.isRequired,
    })
  ),
  contractorData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    fullName: PropTypes.string,
  }),
};

export default TransferCard;
