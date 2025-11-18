import { Typography, Card, Form } from 'antd';
import { FORM_ACTIONS, FORM_TYPES } from '../../../constants/formTypes';
import { OrderedItemsTable } from '../../Contractors';
import { ReactComponent as Orders } from '../../../styles/icons/orders/Orders.svg'; // Update with your actual icon
import { AddOnModal } from '../../../features/modifyingItems';
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
          keyname: 'iconTitle',
          component: <Orders style={{ width: 100, height: 100 }} />, // Use your appropriate icon
        },
        {
          name: 'dynamicTitle',
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
            // ✅ Get current listOrderedItems from parent form
            const currentItems = getFieldValue('listOrderedItems') || [];

            return (
              <AddOnModal
                data={{ listOrderedItems: currentItems }} // ✅ Pass to AddOnModal
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
