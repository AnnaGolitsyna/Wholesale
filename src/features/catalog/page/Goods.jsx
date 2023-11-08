import React from 'react';
//import PropTypes from 'prop-types'
import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';

const Goods = (props) => {
  const dataTest = [
    {
      contractDate: '2023-10-07T08:32:14.541Z',
    },
  ];

  const [form] = Form.useForm();
  const testDate = { date: dayjs(dataTest[0].contractDate) };

  console.log('goods', dayjs(dataTest[0].contractDate, dateFormat));
  console.log('goodsForm', form, testDate.date, form.getFieldValue('date'));

console.log('testDate', testDate);

  return (
    <div>
      Goods
      <DatePicker
        defaultValue={dayjs(dataTest.contractDate, dateFormat)}
        format={dateFormat}
      />
      <Form form={form} initialValues={testDate}>
        <Form.Item name={'date'}>
          <DatePicker  />
        </Form.Item>
      </Form>
    </div>
  );
};

//Goods.propTypes = {}

export default Goods;


