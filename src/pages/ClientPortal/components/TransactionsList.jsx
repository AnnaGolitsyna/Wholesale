import React from 'react';
import { Collapse, Flex, Typography, List, Tag } from 'antd';
import { formattedPriceToString } from '../../../utils/priceUtils';
import { OPERATION_TYPES } from '../../../constants/operationTypes';

const { Text } = Typography;

const TransactionsList = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <Text type="secondary">Нет транзакций за выбранный период</Text>;
  }

  const items = transactions.map((tx) => ({
    key: tx.id,
    label: (
      <Flex justify="space-between" align="center" wrap="wrap" gap={8}>
        <Text>{tx.date}</Text>
        <Text>{tx.labelToPrint}</Text>
        <Tag color={tx.type === OPERATION_TYPES.DEBET ? '#9b4a4a' : '#5661EE'}>
          {formattedPriceToString(tx.sum)}
        </Tag>
      </Flex>
    ),
    children: tx.productList?.length > 0 && (
      <List
        size="small"
        dataSource={tx.productList}
        renderItem={(product) => (
          <List.Item>
            <Flex justify="space-between" style={{ width: '100%' }}>
              <Text>{product.name}</Text>
              <Text>
                {product.count} x{' '}
                {formattedPriceToString(product.selectedPrice)}
              </Text>
            </Flex>
          </List.Item>
        )}
      />
    ),
  }));

  return <Collapse items={items} accordion size="small" />;
};

export default TransactionsList;
