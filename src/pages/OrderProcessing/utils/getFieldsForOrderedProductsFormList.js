import { Typography,  Input, Select, Checkbox } from 'antd';
import { FORM_ACTIONS } from '../../../constants/formTypes';
import { scheduleType, refundsType } from '../../../constants/productsDetail';

import { ReactComponent as Orders } from '../../../styles/icons/orders/Orders.svg';
// import { AddOnModal } from '../../../features/modifyingItems';

/**
 * Returns form fields for editing contractor ordered items
 * Used in OrderProcessing page for full editing capability
 */
const getFieldsForOrderedProductsFormList = (form, actionType, data) => {
  const titleText = {
    [FORM_ACTIONS.EDIT]: 'Редактирование товара (заказ)',
    [FORM_ACTIONS.CREATE]: 'Создание нового товара (заказ)',
  };

  // Create options array from scheduleType, sorted by priority
  const scheduleOptions = Object.values(scheduleType)
    .sort((a, b) => a.priority - b.priority)
    .map((schedule) => ({
      value: schedule.value,
      label: schedule.label,
    }));

  // Create options array from refundsType
  const refundsTypeOptions = Object.values(refundsType).map((refund) => ({
    value: refund.value,
    label: refund.label,
  }));

  return [
    {
      keyname: 'title',
      children: [
        {
          keyname: 'iconTitle',
          component: <Orders style={{ width: 100, height: 100 }} />,
        },
        {
          keyname: 'dynamicTitle',
          component: (
            <Typography.Title level={4}>
              {`${titleText[actionType]} id: ${data?.value || 'Не указано'}` ||
                'Просмотр информации о товаре'}
            </Typography.Title>
          ),
        },

        {
          name: 'value',
          keyname: 'value',
          hidden: true,
        },
      ],
    },
    {
      name: 'label',
      keyname: 'label',
      label: 'Наименование',
      component: <Input placeholder="Введите наименование" />,
      rules: [{ required: true, message: 'Заполните поле "Наименование"' }],
      hasFeedback: true,
    },
    {
      name: 'oldName',
      keyname: 'oldName',
      label: 'Старое наименование',
      component: <Input placeholder="Введите старое наименование" />,
    },
    {
      name: 'scedule',
      keyname: 'scedule',
      label: 'График',
      component: <Select placeholder="Выберите график выхода" options={scheduleOptions} />,
      rules: [{ required: true, message: 'Заполните поле "График"' }],
      hasFeedback: true,
    },
    {
      name: 'refundsType',
      keyname: 'refundsType',
      label: 'Тип возврата',
      component: <Select placeholder="Выберите тип возврата" options={refundsTypeOptions} />,
      rules: [{ required: true, message: 'Заполните поле "Тип возврата"' }],
      hasFeedback: true,
    },
    {
      name: 'inBox',
      keyname: 'inBox',
      label: 'В пачке, шт',
      component: <Input placeholder="Количество в пачке" suffix="шт" />,
    },
    {
      keyname: 'checfboxGroup',
      children: [
        {
          name: 'isBarter',
          keyname: 'isBarter',
          valuePropName: 'checked',
          component: <Checkbox>Товар по бартеру</Checkbox>,
        },
        {
          name: 'weekly',
          keyname: 'weekly',
          valuePropName: 'checked',
          component: <Checkbox>Еженедельно</Checkbox>,
        },
      ],
    },
  ];
};

export { getFieldsForOrderedProductsFormList };
