import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import DynamicFormItem from './DynamicFormItem';

// After wrapped by Form.Item with name property, value(or other property defined by valuePropName) onChange(or other property defined by trigger) props will be added to form controls
// name={name} or { name, ...props } => pass value to form control

const FormItemComponent = (props) => {
  const { condition, component, name } = props;

  return condition ? (
    <Form.Item  {...props}>
      <DynamicFormItem {...props} />
    </Form.Item>
  ) : (
    <Form.Item  {...(name ? { name, ...props } : props)}>
      {component}
    </Form.Item>
  );
};


FormItemComponent.propTypes = {
  condition: PropTypes.string,
  component: PropTypes.node,
  name: PropTypes.string,
};

export default FormItemComponent;


