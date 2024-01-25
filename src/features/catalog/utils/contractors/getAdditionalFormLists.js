import { Input, DatePicker, Checkbox, Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ClientIcon from '../../../../styles/icons/ClientIcon';
import { categoryContractor } from '../../../../constants/categoryContractor';
import AddOnModal from '../../components/modalItem/AddOnModal';

const getAdditionalFieldsForContractorsFormList = (form) => {
  const titleObj = {
    iconTitle: <ClientIcon style={{ fontSize: 60 }} />,
    titleText: {
      create: 'Создание нового посредника',
      edit: 'Редактирование посредника',
    },
  };
  const formList = [
    {
      name: 'nameRC',
      label: 'Наименование',
      component: <Input placeholder="сокращенное имя компании" />,
      rules: [{ required: true, message: 'Заполните обязательное поле' }],
      hasFeedback: true,
    },
    {
      name: 'fullNameRC',
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
      label: 'Код ОКППО/ИНН',
      name: 'taxNumberRC',
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
      name: 'contract',
      children: [
        {
          label: 'Договор №',
          name: 'contractNumberRC',
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
          label: 'от',
          name: 'dateRC',
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
          name: 'activeRC',
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
  return { titleObj, formList };
};

export { getAdditionalFieldsForContractorsFormList };
