import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  Flex,
  ConfigProvider,
  theme,
  message,
  Grid,
  Typography,
} from 'antd';

// Custom Hooks
import { useOrderItems } from '../../hooks/useOrderItems';
import { useOrderStatistics } from '../../hooks/useOrderStatistics';
import { useOrderSave } from '../../hooks/useOrderSave';
import { useItemFilter } from '../../hooks/useItemFilter';

// Components
import OrderItemFilter from './OrderItemFilter';
import OrderItemsList from './OrderItemsList';
import OrderDrawerFooter from './OrderDrawerFooter';
import SaveModeSelectionModal from './SaveModeSelectionModal';
import DateSelectionModal from './DateSelectionModal';
// import { mockOrderProductList } from '../orderProcessingPage/mockData';

const { Text } = Typography;
const { useBreakpoint } = Grid;

const mockOrderProductList = [];

/**
 * Refactored EnhancedOrderEditDrawer
 * Main component orchestrating order editing workflow
 */
const EnhancedOrderEditDrawer = ({
  visible,
  onClose,
  client,
  onSave,
  readOnly = false,
  mode = 'client',
  productSummary = [],
  onSaveDetailedOrder,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = theme.useToken();
  const screens = useBreakpoint();

  const isSupplierMode = mode === 'supplier';
  const useGridLayout = screens.md || screens.lg || screens.xl || screens.xxl;

  // Order Items Management Hook
  const {
    allItems,
    selectedItemIds,
    hasChanges,
    updateItemCount,
    deleteItem,
    addItemsFromProductList,
    handleSelectionChange: handleItemSelectionChange,
    resetItems,
    resetSelection,
  } = useOrderItems(client, visible);

  // Statistics Hook
  const { itemsWithReserve, statistics } = useOrderStatistics(
    allItems,
    productSummary,
    isSupplierMode
  );

  // Filter Hook
  const { filterMode, setFilterMode, displayedItems, handleSelectionChange } =
    useItemFilter(allItems, itemsWithReserve, selectedItemIds, isSupplierMode);

  // Save Workflow Hook
  const {
    saveModalVisible,
    saveMode,
    setSaveMode,
    dateModalVisible,
    orderDate,
    setOrderDate,
    receivedDate,
    setReceivedDate,
    handleSaveClick,
    handleProceedWithSaveMode,
    handleSaveWithDates,
    handleCancelAll,
    handleCancelSaveModal,
    handleCancelDateModal,
    disabledReceivedDate,
  } = useOrderSave(
    client,
    allItems,
    onSave,
    onSaveDetailedOrder,
    onClose,
    () => {},
    isSupplierMode
  );

  // Handle item selection with filter mode auto-switch
  const onItemSelectionChange = useCallback(
    (newSelectedIds) => {
      handleSelectionChange(newSelectedIds, handleItemSelectionChange);
    },
    [handleSelectionChange, handleItemSelectionChange]
  );

  // Handle add items from product list
  const handleAddFromProductList = useCallback(
    (selectedProducts) => {
      const count = addItemsFromProductList(selectedProducts);
      messageApi.success(`Добавлено товаров: ${count}`);
    },
    [addItemsFromProductList, messageApi]
  );

  // Handle delete with message
  const handleDeleteWithMessage = useCallback(
    (itemValue) => {
      deleteItem(itemValue);
      messageApi.success('Товар удален');
    },
    [deleteItem, messageApi]
  );

  // Handle save with message
  const handleSaveWithMessage = useCallback(() => {
    handleSaveClick();
    if (!isSupplierMode) {
      messageApi.success('Заказ успешно обновлен');
    }
  }, [handleSaveClick, isSupplierMode, messageApi]);

  // Handle detailed save with message
  const handleDetailedSaveWithMessage = useCallback(() => {
    const success = handleSaveWithDates();
    if (success) {
      messageApi.success(
        `Сохранен детальный заказ на ${allItems.length} товаров с датами`
      );
    } else {
      messageApi.warning('Пожалуйста, выберите обе даты');
    }
  }, [handleSaveWithDates, allItems.length, messageApi]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (hasChanges) {
      resetItems();
    }
    resetSelection();
    setFilterMode('all');
    handleCancelAll();
    onClose();
  }, [
    hasChanges,
    resetItems,
    resetSelection,
    setFilterMode,
    handleCancelAll,
    onClose,
  ]);

  // Get reserve color helper
  const getReserveColor = useCallback(
    (reserve) => {
      if (reserve < 0) return token.colorError;
      if (reserve === 0) return token.colorWarning;
      return token.colorSuccess;
    },
    [token]
  );

  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          components: {
            Card: {
              headerBg: isSupplierMode
                ? token.purchaseInvoiceBg
                : token.saleInvoiceBg,
              colorBorderSecondary: token.colorSecondaryBtn,
            },
          },
        }}
      >
        <Drawer
          title={
            <Flex vertical gap={8}>
              <Text strong>
                {isSupplierMode ? 'Заказ поставщику' : 'Редактирование заказа'}
              </Text>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                {client?.name}
              </Text>
            </Flex>
          }
          style={{ background: token.colorBgAccent }}
          placement="bottom"
          onClose={handleCancel}
          open={visible}
          height="90%"
          footer={
            !readOnly && (
              <OrderDrawerFooter
                displayedItemsCount={displayedItems.length}
                totalItemsCount={allItems.length}
                statistics={statistics}
                isSupplierMode={isSupplierMode}
                onSave={handleSaveWithMessage}
                onCancel={handleCancel}
                token={token}
                getReserveColor={getReserveColor}
              />
            )
          }
        >
          <Flex vertical gap={12}>
            {/* Filter Section */}
            <OrderItemFilter
              allItems={allItems}
              selectedItemIds={selectedItemIds}
              onSelectionChange={onItemSelectionChange}
              onAddFromProductList={handleAddFromProductList}
              mockOrderProductList={mockOrderProductList}
              filterMode={filterMode}
              onFilterModeChange={setFilterMode}
              readOnly={readOnly}
            />

            {/* Items List */}
            <OrderItemsList
              items={displayedItems}
              selectedItemIds={selectedItemIds}
              isSupplierMode={isSupplierMode}
              readOnly={readOnly}
              onUpdateCount={updateItemCount}
              onDelete={handleDeleteWithMessage}
              token={token}
              getReserveColor={getReserveColor}
              useGridLayout={useGridLayout}
              filterMode={filterMode}
            />
          </Flex>
        </Drawer>

        {/* Save Mode Selection Modal */}
        <SaveModeSelectionModal
          visible={saveModalVisible}
          saveMode={saveMode}
          onSaveModeChange={setSaveMode}
          onProceed={handleProceedWithSaveMode}
          onCancel={handleCancelSaveModal}
          client={client}
          itemsCount={allItems.length}
          totalUnits={statistics.totalOrder}
        />

        {/* Date Selection Modal */}
        <DateSelectionModal
          visible={dateModalVisible}
          orderDate={orderDate}
          receivedDate={receivedDate}
          onOrderDateChange={setOrderDate}
          onReceivedDateChange={setReceivedDate}
          disabledReceivedDate={disabledReceivedDate}
          onSave={handleDetailedSaveWithMessage}
          onCancel={handleCancelDateModal}
          client={client}
          itemsCount={allItems.length}
          totalUnits={statistics.totalOrder}
        />
      </ConfigProvider>
    </>
  );
};

EnhancedOrderEditDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    listOrderedItems: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
        name: PropTypes.string,
        count: PropTypes.number.isRequired,
      })
    ),
  }),
  onSave: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  mode: PropTypes.oneOf(['client', 'supplier']),
  productSummary: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      totalCount: PropTypes.number,
    })
  ),
  onSaveDetailedOrder: PropTypes.func,
};

EnhancedOrderEditDrawer.defaultProps = {
  readOnly: false,
  mode: 'client',
  productSummary: [],
};

export default EnhancedOrderEditDrawer;
