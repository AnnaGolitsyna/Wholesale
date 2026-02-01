import React, { useMemo } from 'react';
import { Typography, Spin, Collapse, Flex, Tag, List, Empty } from 'antd';
import { useProductSummary } from '../../../OrderProcessing/hooks/useProductSummary';
import { useOrderData } from '../../../OrderProcessing/hooks/useOrderData';
import { useClientContractor } from '../../hooks/useClientContractor';
import { scheduleType, refundsType } from '../../../../constants/productsDetail';
import { formattedPriceToString } from '../../../../utils/priceUtils';

const { Text } = Typography;

const OrdersOfClientTab = ({ contractorId }) => {
  const { contractors, isLoading } = useOrderData();
  const { contractor } = useClientContractor(contractorId);
  const productSummary = useProductSummary(contractors);

  const contractorName = contractor?.name;

  const clientOrders = useMemo(() => {
    if (!productSummary || !contractorName) return [];

    return productSummary
      .filter((product) =>
        product.clients.some((c) => c.name === contractorName),
      )
      .map((product) => {
        const clientInfo = product.clients.find(
          (c) => c.name === contractorName,
        );
        return {
          ...product,
          clientCount: clientInfo?.count || 0,
          clientPrices: clientInfo?.prices || [],
        };
      });
  }, [productSummary, contractorName]);

  if (isLoading)
    return (
      <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />
    );

  if (clientOrders.length === 0)
    return <Empty description="Нет активных заказов" />;

  const items = clientOrders.map((product) => ({
    key: product.key,
    label: (
      <Flex justify="space-between" align="center" wrap="wrap" gap={8}>
        <Text strong>{product.productName}</Text>
        <Flex gap={8}>
          <Tag color="#5661EE">{product.clientCount} шт.</Tag>
        </Flex>
      </Flex>
    ),
    children: (
      <List
        size="small"
        dataSource={[
          ...product.clientPrices.map((p, i) => ({
            label: p.dateStart ? `Цена (с ${p.dateStart})` : `Цена ${i + 1}`,
            value: p.price ? `${formattedPriceToString(p.price)} грн` : '—',
          })),
          ...(product.refundsType
            ? [{ label: 'Возврат', value: refundsType[product.refundsType]?.label || product.refundsType }]
            : []),
          ...(product.scedule
            ? [{ label: 'График', value: scheduleType[product.scedule]?.label || product.scedule }]
            : []),
        ]}
        renderItem={(item) => (
          <List.Item>
            <Flex justify="space-between" style={{ width: '100%' }}>
              <Text type="secondary">{item.label}</Text>
              <Text>{item.value}</Text>
            </Flex>
          </List.Item>
        )}
      />
    ),
  }));

  return <Collapse items={items} accordion size="small" />;
};

export default OrdersOfClientTab;
