import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Statistic,
  Typography,
} from 'antd';
import TableOfGoods from './TableOfGoods';
import IconForTable from './IconForTable';
import { textForAllTypes } from '../../utils/textFields';
import useTableBgColor from '../../hook/tableBgColor';

const { TextArea } = Input;

const FormInvoice = ({ type }) => {
  const [invoiceType, setInvoiceType] = useState('debet');

  const handleChange = (e) => {
    // console.log(e.target.value);
    setInvoiceType(e.target.value);
  };

  const [tableBgColorDark, tableBgColorLight] = useTableBgColor(invoiceType);
  return (
    <>
      <Form layout="vertical">
        <Space size="large">
          <IconForTable type={type} bgColor={tableBgColorDark} />
          <Typography.Title
            level={3}
            style={{ color: tableBgColorDark, marginTop: 14 }}
          >
            {textForAllTypes[type][invoiceType].title}
          </Typography.Title>
        </Space>
        <Space.Compact block style={{ justifyContent: 'space-between' }}>
          <Form.Item label="Тип">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: tableBgColorDark,
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
            label={textForAllTypes[type].contractor}
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

        <TableOfGoods
          bgColorDark={tableBgColorDark}
          bgColorLight={tableBgColorLight}
        />
        <Statistic title="Сумма" value={'100.00'} />
      </Form>
    </>
  );
};

// FormInvoice.propTypes = {}

export default FormInvoice;
