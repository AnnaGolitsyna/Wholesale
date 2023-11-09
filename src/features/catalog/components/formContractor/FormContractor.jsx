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
import { formattedDateObj } from '../../../../utils/dateUtils';

import dayjs from 'dayjs';
// var toObject = require('dayjs/plugin/toObject');
// dayjs.extend(toObject);

const { useToken } = theme;

const FormContractor = ({ form, initialValues }) => {
  // const myDate = formattedDateObj('2023-11-01T15:05:09.179Z');
  // console.log('test', dayjs('2018-04-04T16:00:00.000Z'));
  // console.log('myDate', myDate);
  // console.log('isValid', myDate.isValid());
  // const parsedDate = new Date (initialValues?.date);

  // const formattedDate = dayjs(parsedDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  // console.log('formattedDate', formattedDate);
  // console.log('parse', parsedDate);

  //   const contractorData = {
  //     ...initialValues,
  //     date: dayjs(formattedDate),
  //   };

  //   console.log('contractorData', contractorData);

  const { token } = useToken();

  const handleCategoryChange = (value) => {
    form.setFieldsValue({ categoryPrice: undefined });
  };

  // return (
  //   <Form
  //     name="contractor"
  //     layout="vertical"
  //     form={form}
  //     initialValues={initialValues}
  //   >
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
  //       <Form.Item label={'от'} name={'date'}>
  //         <DatePicker placeholder="дата" format="YYYY-MM-DD" />
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
      initialValues={{
        date: null,
        remember: true,
      }}
      // onFinish={onFinish}
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
