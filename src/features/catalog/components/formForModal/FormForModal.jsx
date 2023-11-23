import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Space, Typography } from 'antd';
import DynamicFormItem from './DynamicFormItem';
import { categoryContractor } from '../../utils/contractors/categoryContractor';

const FormForModal = ({ form, initialValues, formList, titleObj }) => {
  return (
    <Form
      name="catalogForm"
      layout="vertical"
      form={form}
      initialValues={initialValues}
    >
      <Space.Compact
        block
        style={{ alignItems: 'flex-end', justifyContent: 'space-evenly' }}
      >
        {titleObj.icon}
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          {titleObj.titleText}
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
          children,
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

        const hasChildren = children && children.length > 0;

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
            {/* {component} */}
            {hasChildren ? (
              <Space
                //  key={`${name}-space`}

                //block

                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {element.children.map((childElement) => (
                  <Form.Item
                    key={childElement.name}
                    label={childElement.label}
                    name={childElement.name}
                    rules={childElement.rules}
                  >
                    {childElement.component}
                  </Form.Item>
                ))}
              </Space>
            ) : (
              component
            )}
          </Form.Item>
        );
      })}
    </Form>
  );
};

FormForModal.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  formList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.node,
      component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      condition: PropTypes.string,
      rules: PropTypes.array,
      hasFeedback: PropTypes.bool,
      tooltip: PropTypes.string,
      valuePropName: PropTypes.string,
      children: PropTypes.array,
    })
  ),
};

export default FormForModal;
