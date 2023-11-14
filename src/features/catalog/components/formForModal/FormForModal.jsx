import React from 'react';
//import PropTypes from 'prop-types'
import { Form, Input, Space, Typography, theme } from 'antd';
import { IdcardTwoTone } from '@ant-design/icons';
import DynamicFormItem from './DynamicFormItem';
import { categoryContractor } from '../../utils/categoryContractor';

const { useToken } = theme;

const FormForModal = ({ form, initialValues, formList }) => {

  const { token } = useToken();


  return (
    <Form
      name="catalogForm"
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
        const {
          name,
          label,
          component,
          condition,
          rules,
          hasFeedback,
          tooltip,
          valuePropName,
        } = element;
        if (condition) {
          return (
            <DynamicFormItem
              key={name}
              shouldUpdateValue={condition}
              element={element}
              categoryList={categoryContractor}
            />
          );
        }

        return (
          <Form.Item
            key={name}
            label={label}
            name={name}
            rules={rules}
            hasFeedback={hasFeedback}
            tooltip={tooltip}
            valuePropName={valuePropName}
          >
            {component}
          </Form.Item>
        );
      })}
    </Form>
  );
};

//FormForModal.propTypes = {}

export default FormForModal;
