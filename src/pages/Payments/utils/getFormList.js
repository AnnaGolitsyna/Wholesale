import { Input, InputNumber, Typography } from 'antd';
import { validateModifyingDate } from '../../../utils/dateUtils';
import { formatWithDots, parseWithDots } from '../../../utils/priceUtils';
import TreeSelectContractor from '../../../components/treeSelect/TreeSelectContractor';
import DatePickerControlDate from '../../../components/datePicker/DatePickerControlDate';
import RadioGroup from '../components/radio/RadioGroup';
import { ReactComponent as PileOfCoins } from '../../../styles/icons/money/PileOfCoins.svg';
import { FORM_ACTIONS } from '../../../constants/formTypes';

const getFieldsForPaymentsFormList = (form, actionType, data) => {
  const titleText = {
    [FORM_ACTIONS.CREATE]: 'Создание новой транзакции',
    [FORM_ACTIONS.EDIT]: 'Редактирование транзакции',
  };

  return [
    {
      keyname: 'title',
      children: [
        {
          keyname: 'iconTitle',
          component: <PileOfCoins style={{ marginRight: 20 }} />,
        },
        {
          keyname: 'dynamicTitle',
          component: (
            <Typography.Title level={3}>
              {titleText[actionType] || 'Просмотр информации'}
            </Typography.Title>
          ),
        },
      ],
    },
    {
      keyname: 'transactionId',
      children: [
        {
          name: 'docNumber',
          keyname: 'docNumber',
          label: 'Номер документа',
          component: <Input disabled />,
        },
        {
          keyname: 'date',
          name: 'date',
          label: 'Даты реализации',
          component: <DatePickerControlDate name="date" />,
          rules: [
            {
              required: true,
              message: 'Выберите дату',
            },
            () => ({
              validator(_, value) {
                return validateModifyingDate(data, value);
              },
            }),
          ],
        },
      ],
    },

    {
      keyname: 'name',
      name: 'name',
      label: 'Наименование контрагента',
      hasFeedback: true,
      rules: [{ required: true, message: 'Выберите поставщика из списка' }],
      component: <TreeSelectContractor form={form} data={data} />,
    },

    {
      keyname: 'type',
      name: 'type',
      label: 'Тип транзакции',
      rules: [{ required: true, message: 'Выберите тип оплаты' }],
      component: <RadioGroup form={form} data={data} />,
    },

    {
      keyname: 'sum',
      name: 'sum',
      label: 'Сумма оплаты',
      rules: [{ type: 'number', required: true, message: 'Заполните сумму' }],
      component: (
        <InputNumber
          placeholder="сумма оплаты"
          style={{
            width: '100%',
          }}
          step={0.01}
          onChange={formatWithDots}
          parser={parseWithDots}
        />
      ),
    },

    {
      name: 'id',
      keyname: 'id',
      label: 'ID',
      component: <Input disabled />,
    },
  ];
};

export { getFieldsForPaymentsFormList };
