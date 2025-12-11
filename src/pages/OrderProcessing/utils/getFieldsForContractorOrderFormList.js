import { Typography, Card, Form } from 'antd';
import { FORM_ACTIONS, FORM_TYPES } from '../../../constants/formTypes';
import { OrderedItemsTable } from '../../Contractors';
import { ReactComponent as Orders } from '../../../styles/icons/orders/Orders.svg';
import { AddOnModal } from '../../../features/modifyingItems';
import TransferCard from '../components/cards/TransferCard'; // ✅ Import the new component

/**
 * Returns form fields for editing contractor ordered items
 * Used in OrderProcessing page for full editing capability
 */
const getFieldsForContractorOrderFormList = (form, actionType, data) => {
  const titleText = {
    [FORM_ACTIONS.EDIT]: 'Редактирование списка заказанных товаров',
    [FORM_ACTIONS.CREATE]: 'Создание списка заказанных товаров',
  };

  return [
    {
      keyname: 'title',
      children: [
        {
          name: 'name',
          keyname: 'contractorName',
          component: (
            <Card>
              <Typography.Text strong style={{ fontSize: '16px', padding: 0 }}>
                {data?.name || data?.fullName || 'Не указано'}
              </Typography.Text>
            </Card>
          ),
        },
        {
          name: 'id',
          keyname: 'id',
          component: (
            <Card>
              <Typography.Text strong style={{ fontSize: '16px', padding: 0 }}>
                {data?.id || 'Не указано'}
              </Typography.Text>
            </Card>
          ),
        },
        // Hidden field to preserve _isBarterMode flag for all-purpose contractors
        {
          name: '_isBarterMode',
          keyname: '_isBarterMode',
          hidden: true,
          component: <Form.Item name="_isBarterMode" noStyle />,
        },
        {
          keyname: 'iconTitle',
          component: <Orders style={{ width: 100, height: 100 }} />,
        },
        {
          keyname: 'dynamicTitle',
          component: (
            <Typography.Title level={4}>
              {titleText[actionType] || 'Просмотр списка заказов'}
            </Typography.Title>
          ),
        },
      ],
    },
    {
      name: 'listOrderedItems',
      keyname: 'listOrderedItems',
      label: 'Список заказанных товаров',
      component: <OrderedItemsTable name="listOrderedItems" />,
    },
    // ✅ NEW: Transfer Card Section with DatePicker and Button
    {
      keyname: 'transferSection',
      component: (
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.listOrderedItems !== currentValues.listOrderedItems ||
            prevValues.filteredItemsKeys !== currentValues.filteredItemsKeys
          }
        >
          {({ getFieldValue }) => {
            if (!data?.category) {
              return null;
            }
            // Get filtered items keys from form (set by OrderedItemsTable)
            const filteredKeys = getFieldValue('filteredItemsKeys') || [];
            const allItems = getFieldValue('listOrderedItems') || [];

            // Get the actual filtered items data and normalize count to Number
            // ✅ Only include the fields needed for transfer (no extra fields like inBox, isBarter, etc.)
            const filteredItems = allItems
              .filter((item) => filteredKeys.includes(item.key))
              .map((item) => ({
                key: item.key,
                value: item.value,
                label: item.label,
                scedule: item.scedule,
                // ✅ Ensure count is always a Number
                count:
                  typeof item.count === 'number'
                    ? item.count
                    : parseInt(item.count, 10) || 0,
              }));

            return (
              <TransferCard
                filteredItems={filteredItems}
                contractorData={{
                  id: data?.id,
                  name: data?.name,
                  fullName: data?.fullName,
                }}
              />
            );
          }}
        </Form.Item>
      ),
    },
    {
      keyname: 'addNewItem',
      component: (
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.listOrderedItems !== currentValues.listOrderedItems
          }
        >
          {({ getFieldValue }) => {
            const currentItems = getFieldValue('listOrderedItems') || [];

            return (
              <AddOnModal
                data={{ listOrderedItems: currentItems }}
                typeData={FORM_TYPES.CONTRACTOR_ORDER_ADDITIONAL}
                actionType={FORM_ACTIONS.CREATE}
                disabled={actionType === FORM_ACTIONS.CREATE}
              />
            );
          }}
        </Form.Item>
      ),
    },
  ];
};

export { getFieldsForContractorOrderFormList };
