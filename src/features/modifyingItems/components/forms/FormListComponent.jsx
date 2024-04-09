import React from 'react';
import PropTypes from 'prop-types';
import { Form, Space } from 'antd';
import FormItemComponent from './FormItemComponent';

const FormListComponent = ({ list }) => {
  return (
    <>
      {list.map(({ keyname, children, ...props }) => {

        if (children) {
          return (
            <Space
              key={keyname}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'stretch',
              }}
            >
              {children.map(({ keyname: childKey, ...props }, index) => {

                return (
                  <Form.Item key={`${childKey}${index}`} {...props}>
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

FormListComponent.propTypes = {
  list: PropTypes.array.isRequired,
};

export default FormListComponent;
