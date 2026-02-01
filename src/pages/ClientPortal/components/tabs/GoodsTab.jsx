import React from 'react';
import { Typography, Spin, List, Flex, Tag, Empty } from 'antd';
import { useGetGoodsListQuery } from '../../../Goods';
import { useClientContractor } from '../../hooks/useClientContractor';
import { formattedPriceToString } from '../../../../utils/priceUtils';

const { Text } = Typography;

const GoodsTab = ({ contractorId }) => {
  const { data: goods = [], isLoading: goodsLoading } = useGetGoodsListQuery(true);
  const { priceCategory, categoryLabel, categoryColor: tagColor, isLoading: contractorLoading } = useClientContractor(contractorId);

  if (goodsLoading || contractorLoading)
    return (
      <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />
    );

  const activeGoods = goods.filter((g) => g.active).sort((a, b) => a.name.localeCompare(b.name));

  if (activeGoods.length === 0)
    return <Empty description="Нет доступных товаров" />;

  return (
    <Flex vertical gap={8}>
      <Flex justify="flex-end">
        <Tag color={tagColor}>
          {categoryLabel}
        </Tag>
      </Flex>
      <List
        size="small"
        split
        dataSource={activeGoods}
        renderItem={(product) => (
          <List.Item style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', padding: '12px 0' }}>
            <Flex justify="space-between" align="center" style={{ width: '100%' }}>
              <Text>{product.name}</Text>
              <Text strong>
                {product[priceCategory]
                  ? `${formattedPriceToString(product[priceCategory])} грн`
                  : '—'}
              </Text>
            </Flex>
          </List.Item>
        )}
      />
    </Flex>
  );
};

export default GoodsTab;
