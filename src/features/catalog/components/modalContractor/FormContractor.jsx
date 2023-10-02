import React from 'react';
import {
  Select,
  Form,
  Input,
  DatePicker,
  Space,
  Typography,
  Checkbox,
  theme,
} from 'antd';
import { IdcardTwoTone } from '@ant-design/icons';
import { categoryContractor } from '../../utils/categoryContractor';
import PropTypes from 'prop-types';

const { useToken } = theme;

const FormContractor = ({ form, initialValues }) => {
  const { token } = useToken();

  return (
    <Form layout="vertical" form={form} initialValues={initialValues}>
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
        <Form.Item name={'key'} style={{ display: 'none' }}>
          <Input type="hidden" />
        </Form.Item>
      </Space.Compact>
      <Form.Item
        label={'Наименование'}
        name={'name'}
        hasFeedback
        rules={[{ required: true, message: 'Заполните обязательное поле' }]}
      >
        <Input placeholder="сокращенное имя компании" />
      </Form.Item>
      <Form.Item
        label={'Полное наименование'}
        name={'fullName'}
        hasFeedback
        rules={[{ required: true, message: 'Заполните обязательное поле' }]}
      >
        <Input.TextArea
          placeholder="полное наиенование компании (для документов)"
          rows={2}
        />
      </Form.Item>
      <Form.Item
        label={'Категория контрагента'}
        name={'category'}
        hasFeedback
        rules={[{ required: true, message: 'Выберите категорию из списка' }]}
      >
        <Select placeholder="выбери категорию" options={categoryContractor} />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.category !== currentValues.category
        }
      >
        {({ getFieldValue }) => {
          const categoryDetails = categoryContractor.find(
            (category) => category.value === getFieldValue('category')
          );

          const optionsPrices = categoryDetails?.children
            ? categoryDetails.children.map(({ label, value }) => ({
                label,
                value,
              }))
            : null;

          return (
            optionsPrices && (
              <Form.Item
                name="categoryPrice"
                label="Категория цен"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Выберите категорию из списка',
                  },
                ]}
              >
                <Select
                  placeholder="выбери категорию цен"
                  options={optionsPrices}
                />
              </Form.Item>
            )
          );
        }}
      </Form.Item>
      <Form.Item label={'E-mail'} name={'email'} rules={[{ type: 'email' }]}>
        <Input placeholder="e-mail" />
      </Form.Item>
      <Form.Item label={'Tелефон'} name={'phone'}>
        <Input placeholder="номер телефона" />
      
      </Form.Item>
      <Form.Item
        label={'Код ОКППО/ИНН'}
        name={'taxNumber'}
        tooltip="Налоговый код"
        rules={[
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
        ]}
      >
        <Input placeholder="налоговый код" />
      </Form.Item>
      <Space.Compact block>
        <Form.Item
          label={'Договор №'}
          name={'contractNumber'}
          style={{
            width: '65%',
          }}
        >
          <Input placeholder="номер договора" />
        </Form.Item>
        <Form.Item label={'от'} name={'contractDate'}>
          <DatePicker placeholder="дата" />
        </Form.Item>
      </Space.Compact>
      <Form.Item label="Адрес" name={'adress'}>
        <Input.TextArea placeholder="полный адрес (для документов)" rows={3} />
      </Form.Item>
      <Form.Item name={'active'} valuePropName="checked">
        <Checkbox>Активный контрагент</Checkbox>
      </Form.Item>
    </Form>
  );
};

FormContractor.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
};

export default FormContractor;
