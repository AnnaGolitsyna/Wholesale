import { Typography } from 'antd';
import ProductSelection from '../components/productsSelection/ProductSelection';

/**
 * Returns form fields for adding new products to contractor order
 * Used in AddOnModal with FORM_TYPES.CONTRACTOR_ORDER_ADDITIONAL
 */
const getAdditionalFieldsContractorOrderFormList = (form, actionType, data) => {
  // Get existing items from parent form to filter them out
 const existingItems = data?.listOrderedItems || [];


  return [
    {
      keyname: 'title',
      children: [
        {
          name: 'dynamicTitle',
          keyname: 'dynamicTitle',
          component: (
            <Typography.Title level={4}>
              Добавить товары в заказ
            </Typography.Title>
          ),
        },
      ],
    },
    {
      keyname: 'productSelectionSection',
      component: (
        <Typography.Text
          type="secondary"
          style={{ display: 'block', marginBottom: 16 }}
        >
          Выберите товары из списка и настройте параметры заказа
        </Typography.Text>
      ),
    },
    {
      name: 'selectedProducts',
      keyname: 'selectedProducts',
      component: <ProductSelection existingItems={existingItems} />,
      // Hidden field to store selected products
      hidden: false,
    },
  ];
};

export { getAdditionalFieldsContractorOrderFormList };
