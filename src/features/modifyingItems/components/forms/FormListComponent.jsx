import React from 'react';
import PropTypes from 'prop-types';
import { Form, Space } from 'antd';
import FormItemComponent from './FormItemComponent';

const FormListComponent = ({ list }) => {
  return (
    <>
      {list.map(({keyname, children, ...props}) => {
       console.log('item', keyname, props);
        if (children) {
          return (
            <Space
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'stretch',
              }}
            >
              {children.map(({keyname, ...props}) => {
                console.log('child', keyname, props);
                return (
                  <Form.Item key={keyname} {...props}>
                    <FormItemComponent {...props} />
                  </Form.Item>
                );
              })}
            </Space>
          );
        } else {
          return (
            <Form.Item key={keyname} {...props}>
              <FormItemComponent {...props} />
            </Form.Item>
          );
        }
      })}
    </>
  );
};

FormListComponent.propTypes = {};

export default FormListComponent;
