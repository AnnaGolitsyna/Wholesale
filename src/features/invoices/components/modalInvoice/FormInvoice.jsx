import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import { DatePicker, Form, Input, Radio, Select, Space } from 'antd';
import { theme } from 'antd';
import TableOfGoods from './TableOfGoods';

const { TextArea } = Input;
const { useToken } = theme;

const FormInvoice = ({ type }) => {
  const [invoiceType, setInvoiceType] = useState('debet');

  const { token } = useToken();
  const handleChange = (e) => {
    // console.log(e.target.value);
    setInvoiceType(e.target.value);
  };

  const tableBgColor =
    invoiceType === 'debet' ? token.geekblue2 : token.purple2;

  return (
    <>
      <Form layout="vertical">
        <Space.Compact block style={{ justifyContent: 'space-between' }}>
          <Form.Item label="Тип">
            <Radio.Group
              buttonStyle="solid"
              onChange={handleChange}
              defaultValue={invoiceType}
            >
              <Radio.Button value="debet">
                Продажа товара покупателю
              </Radio.Button>
              <Radio.Button value="credit">
                Возврат на склад от покупателя
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Дата">
            <DatePicker />
          </Form.Item>
        </Space.Compact>

        <Space.Compact block style={{ justifyContent: 'space-between' }}>
          <Form.Item
            style={{
              width: '45%',
            }}
            label="Клиент"
          >
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            style={{
              width: '45%',
            }}
            label="Описание"
          >
            <TextArea rows={2} />
          </Form.Item>
        </Space.Compact>

        <TableOfGoods tableBgColor={tableBgColor} />
      </Form>
    </>
  );
};

// FormInvoice.propTypes = {}

export default FormInvoice;
