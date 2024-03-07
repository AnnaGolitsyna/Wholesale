import { Input, DatePicker, Checkbox, Select, Typography } from 'antd';
import { categoryContractor } from '../../../constants/categoryContractor';
import { AddOnModal } from '../../../features/modifyingItems';
import ClientIcon from '../../../styles/icons/ClientIcon';

const getFieldsForContractorsFormList = (form, actionType) => {
  const titleText = {
    create: 'Создание нового клиента',
    edit: 'Редактирование клиента',
  };

  return [
    {
      keyname: 'title',
      children: [
        {
          keyname: 'iconTitle',
          component: <ClientIcon style={{ fontSize: 60 }} />,
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
          rules: [{ required: true, message: 'Заполните обязательное поле' }],
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
      rules: [{ required: true, message: 'Заполните обязательное поле' }],
      hasFeedback: true,
    },
    {

      keyname: 'price',
      children: [
        {
          name: 'category',
          keyname: 'category',
          label: 'Категория контрагента',
          hasFeedback: true,
          rules: [{ required: true, message: 'Выберите категорию из списка' }],
          component: (
            <Select
              placeholder="выбери категорию"
              options={categoryContractor}
              onChange={() => form.setFieldsValue({ categoryPrice: undefined })}
            />
          ),
        },

        {
          name: 'categoryPrice',
          keyname: 'categoryPrice',
          label: 'Категория цен',
          hasFeedback: true,
          rules: [
            {
              required: true,
              message: 'Выберите категорию из списка',
            },
          ],
          condition: 'category',
          /**
           * @param component - The component for the field ('../../features/modifyingItems')
           */
        },
      ],
    },
    {
      name: 'email',
      keyname: 'email',
      label: 'E-mail',
      rules: [{ type: 'email' }],
      component: <Input placeholder="e-mail" />,
    },
    {
      name: 'phone',
      keyname: 'phone',
      label: 'Tелефон',
      component: <Input placeholder="номер телефона" />,
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
      name: 'adress',
      keyname: 'adress',
      label: 'Адрес',
      component: (
        <Input.TextArea placeholder="полный адрес (для документов)" rows={3} />
      ),
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

    {
      name: 'relatedCompanies',
      keyname: 'relatedCompanies',
      label: 'Список связанных компаний - посредников',
      condition: 'isRelatedCompanies',
      /**
       * @param component - The component for the field ('../../features/modifyingItems')
       */
    },
    {

      keyname: 'addRelatedCompanies',
      component: <AddOnModal data={null} typeData="Contractor" actionType="create" />,
    },
  ];
};

export { getFieldsForContractorsFormList };
