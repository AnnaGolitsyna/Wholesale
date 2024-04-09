import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import DynamicFormItem from './DynamicFormItem';

const FormItemComponent = (props) => {
   // console.log('FormItemComponent', props, props.children);
  const { condition, component, name } = props;
 // console.log('FIC', name, props.keyname);
  if (condition) {
   // console.log('condition', condition);
    const { label, ...restProps } = props;
    return (
      //  <Form.Item key={keyname} {...props} noStyle>
      // <Form.Item {...restProps} noStyle>
      //   <DynamicFormItem {...restProps} />
      // </Form.Item>
      <DynamicFormItem {...restProps} />
    );
  } else {
    return <Form.Item noStyle name={name}>{component}</Form.Item> ;
  }

};

FormItemComponent.propTypes = {};

export default FormItemComponent;
