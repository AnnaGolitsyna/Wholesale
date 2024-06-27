import { Input, DatePicker, Checkbox, Typography } from 'antd';
import { ReactComponent as FavoriteCustomer } from '../../../styles/icons/users/FavoriteCustomer.svg';

const getAdditionalFieldsForContractorsFormList = (form, actionType) => {
  const titleText = {
    create: 'Создание нового посредника',
    edit: 'Редактирование посредника',
  };

  return [
    {
      keyname: 'title',
      children: [
        {
          keyname: 'iconTitle',
          component: <FavoriteCustomer />,
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
      keyname: 'nameId',
      children: [
        {
          name: 'name',
          keyname: 'name',
          label: 'Наименование',
          component: <Input placeholder="сокращенное имя компании" />,
          rules: [{ required: true, message: 'Заполните поле "Наименование"' }],
          hasFeedback: true,
        },
        {
          name: 'id',
          keyname: 'id',
          label: 'ID',
          component: <Input disabled />,
        },
      ],
    },

    {
      name: 'fullName',
      keyname: 'fullName',
      label: 'Полное наименование',
      component: (
        <Input.TextArea
          placeholder="полное наименование компании (для документов)"
          rows={2}
        />
      ),
      rules: [
        { required: true, message: 'Заполните поле "Полное наименование"' },
      ],
      hasFeedback: true,
    },

    {
      name: 'taxNumber',
      keyname: 'taxNumber',
      label: 'Код ОКППО/ИНН',
      tooltip: 'Налоговый код',
      rules: [
        {
          type: 'number',
          message: 'Введите только числа',
          validator: (rule, value) => {
            if (!value || /^[0-9]+$/.test(value)) {
              return Promise.resolve();
            }
            return Promise.reject('Введите только числа');
          },
        },
      ],
      component: <Input placeholder="налоговый код" />,
    },

    {
      keyname: 'contract',
      children: [
        {
          name: 'contractNumber',
          keyname: 'contractNumber',
          label: 'Договор №',
          component: (
            <Input
              placeholder="номер договора"
              style={{
                width: '100%',
              }}
            />
          ),
        },

        {
          name: 'date',
          keyname: 'date',
          label: 'от',
          component: (
            <DatePicker
              placeholder="дата"
              format="YYYY-MM-DD"
              style={{
                width: '100%',
              }}
            />
          ),
        },

        {
          name: 'active',
          keyname: 'active',
          valuePropName: 'checked',
          component: (
            <Checkbox
              style={{
                width: '100%',
              }}
            >
              Активный
            </Checkbox>
          ),
        },
      ],
    },
  ];
};

export { getAdditionalFieldsForContractorsFormList };
