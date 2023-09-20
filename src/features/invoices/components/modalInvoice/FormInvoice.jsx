import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import { ConfigProvider, DatePicker, Form, Input, Radio, Select, Space, Statistic, Typography } from 'antd';
import { theme } from 'antd';
import TableOfGoods from './TableOfGoods';
import { textForAllTypes } from '../../utils/textFields';

const { TextArea } = Input;
const { useToken } = theme;


const FormInvoice = ({ type }) => {
  console.log(type, textForAllTypes[type]);
  const [invoiceType, setInvoiceType] = useState('debet');

  const { token } = useToken();
  const handleChange = (e) => {
    // console.log(e.target.value);
    setInvoiceType(e.target.value);
  };

  const tableBgColor =
    invoiceType === 'debet' ? token.green4 : token.purple4;

  return (
    <>
      <Form layout="vertical">
        <Typography.Title level={3} style={{ color: tableBgColor }}>
          {textForAllTypes[type][invoiceType].title}
        </Typography.Title>
        <Space.Compact block style={{ justifyContent: 'space-between' }}>
          <Form.Item label="Тип">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: tableBgColor,
                },
              }}
            >
              <Radio.Group
                buttonStyle="solid"
                onChange={handleChange}
                defaultValue={invoiceType}
              >
                <Radio.Button value="debet">
                  {textForAllTypes[type].debet.radioText}
                </Radio.Button>
                <Radio.Button value="credit">
                  {textForAllTypes[type].credit.radioText}
                </Radio.Button>
              </Radio.Group>
            </ConfigProvider>
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
        <Statistic title="Сумма" value={'100.00'} />
      </Form>
    </>
  );
};

// FormInvoice.propTypes = {}

export default FormInvoice;

