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
      <Form.Item noStyle {...restProps}>
        <DynamicFormItem {...restProps} />
      </Form.Item>
    );
  } else {
   // console.log('component', props);
    return (
      <>
        {name ? (
          <Form.Item noStyle name={name} {...props}>
            {component}
          </Form.Item>
        ) : (
          <Form.Item noStyle {...props}>
            {component}
          </Form.Item>
        )}
      </>
      // <Form.Item noStyle name={name} {...props}>
      //     {component}
      //   </Form.Item>
    );
  }
};

FormItemComponent.propTypes = {};

export default FormItemComponent;
