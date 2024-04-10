import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import DynamicFormItem from './DynamicFormItem';

// After wrapped by Form.Item with name property, value(or other property defined by valuePropName) onChange(or other property defined by trigger) props will be added to form controls
// name={name} or { name, ...props } => pass value to form control

const FormItemComponent = (props) => {
  const { condition, component, name } = props;

  if (condition) {
    const { label, ...restProps } = props;
    return (
      <Form.Item noStyle {...restProps}>
        <DynamicFormItem {...restProps} />
      </Form.Item>
    );
  } else {
    return (
      <Form.Item noStyle {...(name ? { name, ...props } : props)}>
        {component}
      </Form.Item>
    );
  }
};

FormItemComponent.propTypes = {
  condition: PropTypes.string,
  component: PropTypes.node,
  name: PropTypes.string,
};

export default FormItemComponent;