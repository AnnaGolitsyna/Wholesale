import React from 'react';
import {
  Form,
  Input,
  DatePicker,
  Space,
  Typography,
  Checkbox,
  theme,
  Button,
} from 'antd';
import { IdcardTwoTone } from '@ant-design/icons';
import CategoryFormItem from './CategoryFormItem';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import 'dayjs/locale/uk';
dayjs.locale('uk');
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';

const { useToken } = theme;

const FormContractor = ({ form, initialValues }) => {
  const date = dayjs('2015/01/01', dateFormat);
  const myDate = dayjs(initialValues.contractDate, 'YYYY/MM/DD');

  console.log('IV', initialValues.contractDate);
  console.log('myDay', myDate);
  console.log('docDate', date);

  //console.log('test', initialValues, 'contrDate', initialValues.contractDate);

  const testDate = {
    ...initialValues,
    date: myDate,
    //contractDate: date,
    //contractDate: dayjs(initialValues.contractDate),
    // contractDate: dayjs(initialValues.contractDate).format(dateFormat),
  };

  console.log('testDate', testDate);
  const { token } = useToken();

  const handleCategoryChange = (value) => {
    form.setFieldsValue({ categoryPrice: undefined });
  };

  // return (
  //   <Form name="contractor" layout="vertical" form={form} initialValues={testDate}>
  //     <Space.Compact
  //       block
  //       style={{ alignItems: 'flex-start', justifyContent: 'space-evenly' }}
  //     >
  //       <IdcardTwoTone
  //         twoToneColor={token.colorInfo}
  //         style={{ fontSize: 40 }}
  //       />
  //       <Typography.Title level={3} style={{ marginTop: 0 }}>
  //         Новый контрагент
  //       </Typography.Title>
  //       <Form.Item name={'id'} style={{ display: 'none' }}>
  //         <Input type="hidden" />
  //       </Form.Item>
  //     </Space.Compact>
  //     <Form.Item
  //       label={'Наименование'}
  //       name={'name'}
  //       hasFeedback
  //       rules={[{ required: true, message: 'Заполните обязательное поле' }]}
  //     >
  //       <Input placeholder="сокращенное имя компании" />
  //     </Form.Item>
  //     <Form.Item
  //       label={'Полное наименование'}
  //       name={'fullName'}
  //       hasFeedback
  //       rules={[{ required: true, message: 'Заполните обязательное поле' }]}
  //     >
  //       <Input.TextArea
  //         placeholder="полное наиенование компании (для документов)"
  //         rows={2}
  //       />
  //     </Form.Item>

  //     <CategoryFormItem onChange={handleCategoryChange} />

  //     <Form.Item label={'E-mail'} name={'email'} rules={[{ type: 'email' }]}>
  //       <Input placeholder="e-mail" />
  //     </Form.Item>
  //     <Form.Item label={'Tелефон'} name={'phone'}>
  //       <Input placeholder="номер телефона" />
  //     </Form.Item>
  //     <Form.Item
  //       label={'Код ОКППО/ИНН'}
  //       name={'taxNumber'}
  //       tooltip="Налоговый код"
  //       rules={[
  //         {
  //           type: 'number',
  //           message: 'Введите только числа',
  //           validator: (rule, value) => {
  //             if (!value || /^[0-9]+$/.test(value)) {
  //               return Promise.resolve();
  //             }
  //             return Promise.reject('Введите только числа');
  //           },
  //         },
  //       ]}
  //     >
  //       <Input placeholder="налоговый код" />
  //     </Form.Item>
  //     <Space.Compact block>
  //       <Form.Item
  //         label={'Договор №'}
  //         name={'contractNumber'}
  //         style={{
  //           width: '65%',
  //         }}
  //       >
  //         <Input placeholder="номер договора" />
  //       </Form.Item>
  //       <Form.Item label={'от'} name={'contractDate'}>
  //         <DatePicker
  //           placeholder="дата"
  //           //initialValue={dayjs(initialValues.contractDate).format(dateFormat)}
  //           // format={dateFormat}
  //         />
  //       </Form.Item>
  //     </Space.Compact>
  //     <Form.Item label="Адрес" name={'adress'}>
  //       <Input.TextArea placeholder="полный адрес (для документов)" rows={3} />
  //     </Form.Item>
  //     <Form.Item name={'active'} valuePropName="checked">
  //       <Checkbox>Активный контрагент</Checkbox>
  //     </Form.Item>
  //   </Form>
  // );
  return (
    <Form
      form={form}
      name="basic"
      initialValues={testDate}
      // initialValues={{
      //   remember: true,
      //   date,
      // }}
      //onFinish={onFinish}
    >
      <Form.Item
        label="Select Date"
        name="date"
        rules={[
          {
            required: true,
            message: 'Please select a date!',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

FormContractor.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
};

export default FormContractor;
