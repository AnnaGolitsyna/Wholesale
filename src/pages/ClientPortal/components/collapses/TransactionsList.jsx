import React from 'react';
import { Collapse, Flex, Typography, List, Tag } from 'antd';
import { formattedPriceToString } from '../../../../utils/priceUtils';
import { OPERATION_TYPES } from '../../../../constants/operationTypes';

const { Text } = Typography;

const TransactionsList = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <Text type="secondary">Нет транзакций за выбранный период</Text>;
  }

  const items = transactions.map((tx) => ({
    key: tx.id,
    label: (
      <Flex vertical gap={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={8}>
          <Text>{tx.date}</Text>
          <Text>{tx.labelToPrint}</Text>
          <Tag color={tx.type === OPERATION_TYPES.DEBET ? '#9b4a4a' : '#5661EE'}>
            {formattedPriceToString(tx.sum)}
          </Tag>
        </Flex>
        {tx.balanceAfter != null && (
          <Text type="secondary" style={{ fontSize: 12 }}>
            Сальдо: {formattedPriceToString(tx.balanceAfter)}
          </Text>
        )}
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
                {formattedPriceToString(product.selectedPrice || product.price)}
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
