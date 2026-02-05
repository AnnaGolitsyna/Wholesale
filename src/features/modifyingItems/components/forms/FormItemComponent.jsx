import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';


// After wrapped by Form.Item with name property, value(or other property defined by valuePropName) onChange(or other property defined by trigger) props will be added to form controls
// name={name} or { name, ...props } => pass value to form control

const FormItemComponent = (props) => {
  const { component, name, compact, ...restProps } = props;

  return (
    <Form.Item {...(name ? { name, ...restProps } : restProps)}>{component}</Form.Item>
  );
};

FormItemComponent.propTypes = {
  condition: PropTypes.string,
  component: PropTypes.node,
  name: PropTypes.string,
};

export default FormItemComponent;
