import { Typography, Card } from 'antd';
import { FORM_ACTIONS } from '../../../constants/formTypes';
import { OrderedItemsTable } from '../../Contractors';
import { ReactComponent as Orders } from '../../../styles/icons/orders/Orders.svg'; // Update with your actual icon

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
  ];
};

export { getFieldsForContractorOrderFormList };
