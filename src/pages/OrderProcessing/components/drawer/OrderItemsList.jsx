import React from 'react';
import PropTypes from 'prop-types';
import { List, Row, Col, Empty } from 'antd';
import ClientOrderItemCard from './ClientOrderItemCard';
import SupplierOrderItemCard from './SupplierOrderItemCard';

/**
 * OrderItemsList Component
 * Renders items in grid or list layout based on screen size
 * Delegates to appropriate card component based on mode
 */
const OrderItemsList = ({
  items,
  selectedItemIds,
  isSupplierMode,
  readOnly,
  onUpdateCount,
  onDelete,
  token,
  getReserveColor,
  useGridLayout,
  filterMode,
}) => {
  if (items.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          filterMode === 'selected'
            ? 'Выберите товары из списка выше'
            : 'Нет товаров в заказе'
        }
      />
    );
  }

  const renderItemCard = (item) => {
    const itemId = item.value || item.id;
    const isSelected = selectedItemIds.includes(itemId);

    const commonProps = {
      item,
      isSelected,
      readOnly,
      onUpdateCount,
      onDelete,
      token,
    };

    if (isSupplierMode) {
      return (
        <SupplierOrderItemCard
          {...commonProps}
          getReserveColor={getReserveColor}
        />
      );
    }

    return <ClientOrderItemCard {...commonProps} />;
  };

  if (useGridLayout) {
    return (
      <Row gutter={[12, 12]}>
        {items.map((item) => (
          <Col
            key={item.value || item.id}
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={8}
          >
            {renderItemCard(item)}
          </Col>
        ))}
      </Row>
    );
  }

  return <List dataSource={items} renderItem={renderItemCard} />;
};

OrderItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItemIds: PropTypes.array.isRequired,
  isSupplierMode: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool.isRequired,
  onUpdateCount: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  getReserveColor: PropTypes.func,
  useGridLayout: PropTypes.bool,
  filterMode: PropTypes.string.isRequired,
};

OrderItemsList.defaultProps = {
  useGridLayout: false,
  getReserveColor: () => {},
};

export default OrderItemsList;
