import React, { useState } from 'react';

// import PropTypes from 'prop-types'
import {
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Table,
  Space,
  ConfigProvider,
} from 'antd';

const { TextArea } = Input;

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const FormInvoice = ({ type }) => {
  return (
    <>
      <Form layout="vertical">
        <Space.Compact block style={{ justifyContent: 'space-between' }}>
          <Form.Item label="Тип">
            <Radio.Group>
              <Radio value="debet">Продажа товара покупателю</Radio>
              <Radio value="credit">Возврат на склад от покупателя</Radio>
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

        <ConfigProvider
          theme={{
            inherit: false,
            token: {
              colorBgBase: '#d6e4ff',
            },
          }}
        >
          <Table dataSource={dataSource} columns={columns} />
        </ConfigProvider>
      </Form>
    </>
  );
};

// FormInvoice.propTypes = {}

export default FormInvoice;

// '#d6e4ff'
// '#efdbff'

// const [componentDisabled, setComponentDisabled] = useState(true);
//  return (
//    <>
//      <Checkbox
//        checked={componentDisabled}
//        onChange={(e) => setComponentDisabled(e.target.checked)}
//      >
//        Form disabled
//      </Checkbox>
//      <Form
//        labelCol={{
//          span: 4,
//        }}
//        wrapperCol={{
//          span: 14,
//        }}
//        layout="horizontal"
//        disabled={componentDisabled}
//        style={{
//          maxWidth: 600,
//        }}
//      >
//        <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
//          <Checkbox>Checkbox</Checkbox>
//        </Form.Item>
//        <Form.Item label="Radio">
//          <Radio.Group>
//            <Radio value="apple"> Apple </Radio>
//            <Radio value="pear"> Pear </Radio>
//          </Radio.Group>
//        </Form.Item>
//        <Form.Item label="Input">
//          <Input />
//        </Form.Item>
//        <Form.Item label="Select">
//          <Select>
//            <Select.Option value="demo">Demo</Select.Option>
//          </Select>
//        </Form.Item>
//        <Form.Item label="TreeSelect">
//          <TreeSelect
//            treeData={[
//              {
//                title: 'Light',
//                value: 'light',
//                children: [
//                  {
//                    title: 'Bamboo',
//                    value: 'bamboo',
//                  },
//                ],
//              },
//            ]}
//          />
//        </Form.Item>
//        <Form.Item label="Cascader">
//          <Cascader
//            options={[
//              {
//                value: 'zhejiang',
//                label: 'Zhejiang',
//                children: [
//                  {
//                    value: 'hangzhou',
//                    label: 'Hangzhou',
//                  },
//                ],
//              },
//            ]}
//          />
//        </Form.Item>
//        <Form.Item label="DatePicker">
//          <DatePicker />
//        </Form.Item>
//        <Form.Item label="RangePicker">
//          <RangePicker />
//        </Form.Item>
//        <Form.Item label="InputNumber">
//          <InputNumber />
//        </Form.Item>
//        <Form.Item label="TextArea">
//          <TextArea rows={2} />
//        </Form.Item>
//        <Form.Item label="Switch" valuePropName="checked">
//          <Switch />
//        </Form.Item>
//        <Form.Item
//          label="Upload"
//          valuePropName="fileList"
//          getValueFromEvent={normFile}
//        >
//          <Upload action="/upload.do" listType="picture-card">
//            <div>
//              <PlusOutlined />
//              <div
//                style={{
//                  marginTop: 8,
//                }}
//              >
//                Upload
//              </div>
//            </div>
//          </Upload>
//        </Form.Item>
//        <Form.Item label="Button">
//          <Button>Button</Button>
//        </Form.Item>
//        <Form.Item label="Slider">
//          <Slider />
//        </Form.Item>
//      </Form>
//    </>
