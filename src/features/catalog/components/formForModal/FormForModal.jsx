import React from 'react';
//import PropTypes from 'prop-types'
import { Form, Input, Space, Typography, theme } from 'antd';
import { IdcardTwoTone } from '@ant-design/icons';
import DynamicFormItem from './DynamicFormItem';
import { getContractorsFormList } from './formLists';
import { categoryContractor } from '../../utils/categoryContractor';

const { useToken } = theme;

const FormForModal = ({ form, initialValues }) => {
//   const [form] = Form.useForm();
  const { token } = useToken();

  const handleCategoryChange = (value) => {
    form.setFieldsValue({ categoryPrice: undefined });
  };

  const formList = getContractorsFormList(handleCategoryChange);

  return (
    <Form
      name="contractor"
      layout="vertical"
      form={form}
      initialValues={initialValues}
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

      {formList.map((element) => {
        if (element.condition) {
          console.log('if', element, element.component);
          return (
            <DynamicFormItem
              key={element.name}
              shouldUpdateValue="category"
              element={element}
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

//FormForModal.propTypes = {}

export default FormForModal;
