import React from 'react';
//import PropTypes from 'prop-types'
import {
  Form,
  Input,
  DatePicker,
  Space,
  Typography,
  Checkbox,
  Select,
  theme,
} from 'antd';
import { IdcardTwoTone } from '@ant-design/icons';
import  DynamicFormItem  from '../components/formForModal/DynamicFormItem';

//import CategoryFormItem from './CategoryFormItem';
import { emptyContractorObject } from '../utils/emptyContractorForm';
import { categoryContractor } from '../utils/categoryContractor';

const { useToken } = theme;

const Goods = () => {
  const [form] = Form.useForm();
  const { token } = useToken();

  const handleCategoryChange = (value) => {
    form.setFieldsValue({ categoryPrice: undefined });
  };

  const contractorsFormList = [
    {
      name: 'name',
      label: 'Наименование',
      component: <Input placeholder="сокращенное имя компании" />,
      rules: [{ required: true, message: 'Заполните обязательное поле' }],
      hasFeedback: true,
    },
    {
      name: 'fullName',
      label: 'Полное наименование',
      component: (
        <Input.TextArea
          placeholder="полное наиенование компании (для документов)"
          rows={2}
        />
      ),
      rules: [{ required: true, message: 'Заполните обязательное поле' }],
      hasFeedback: true,
    },
    {
      name: 'category',
      label: 'Категория контрагента',
      hasFeedback: true,
      rules: [{ required: true, message: 'Выберите категорию из списка' }],
      component: (
        <Select
          placeholder="выбери категорию"
          options={categoryContractor}
          onChange={handleCategoryChange}
        />
      ),
    },

    {
      name: 'categoryPrice',
      label: 'Категория цен',
      hasFeedback: true,
      rules: [
        {
          required: true,
          message: 'Выберите категорию из списка',
        },
      ],
      condition: (prevValues, currentValues) =>
        prevValues.category !== currentValues.category,

      component: (optionsPrices) => (
        <Select placeholder="выбери категорию цен" options={optionsPrices} />
      ),
    },

    {
      label: 'E-mail',
      name: 'email',
      rules: [{ type: 'email' }],
      component: <Input placeholder="e-mail" />,
    },
    {
      label: 'Tелефон',
      name: 'phone',
      component: <Input placeholder="номер телефона" />,
    },
    {
      label: 'Код ОКППО/ИНН',
      name: 'taxNumber',
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
      label: 'Договор №',
      name: 'contractNumber',
      component: <Input placeholder="номер договора" />,
    },
    {
      label: 'от',
      name: 'date',
      component: <DatePicker placeholder="дата" format="YYYY-MM-DD" />,
    },
    {
      label: 'Адрес',
      name: 'adress',
      component: (
        <Input.TextArea placeholder="полный адрес (для документов)" rows={3} />
      ),
    },
    {
      name: 'active',
      valuePropName: 'checked',
      component: <Checkbox>Активный контрагент</Checkbox>,
    },
  ];


  return (
    <Form
      name="contractor"
      layout="vertical"
      form={form}
      initialValues={emptyContractorObject}
    >
      <Space.Compact
        block
        style={{ alignItems: 'flex-start', justifyContent: 'space-evenly' }}
      >
        <IdcardTwoTone
          twoToneColor={token.colorInfo}
          style={{ fontSize: 40 }}
        />
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          Новый контрагент
        </Typography.Title>
        <Form.Item name={'id'} style={{ display: 'none' }}>
          <Input type="hidden" />
        </Form.Item>
      </Space.Compact>

      {contractorsFormList.map((element) => {
        if (element.condition) {
          console.log('if', element, element.component);
          return (
            <DynamicFormItem
              key={element.name}
              shouldUpdateValue="category"
              element={element}
              form={form}
              categoryList={categoryContractor}
            />
          );
        }

        return (
          <Form.Item
            key={element.name}
            label={element.label}
            name={element.name}
            rules={element.rules}
            hasFeedback={element.hasFeedback}
            tooltip={element.tooltip}
            valuePropName={element.valuePropName}
          >
            {element.component}
          </Form.Item>
        );
      })}
    </Form>
  );
};

//Goods.propTypes = {}

export default Goods;
