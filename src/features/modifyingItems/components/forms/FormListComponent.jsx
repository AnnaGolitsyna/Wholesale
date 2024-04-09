import React from 'react';
import PropTypes from 'prop-types';
import { Form, Space } from 'antd';
import FormItemComponent from './FormItemComponent';

const FormListComponent = ({ data }) => {
  return (
    <>
      {data?.map(({ keyname, children, ...itemProps }, index) => {
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
              {children.map(({ keyname: childKey, ...childProps }, index) => {

                return (
                  <Form.Item
                    key={childKey}
                    {...childProps}
                  >
                    <FormItemComponent {...childProps} />
                  </Form.Item>
                );
              })}
            </Space>
          );
        } else {
          return (
            <Form.Item
              key={keyname}
              {...itemProps}
            >
              <FormItemComponent {...itemProps} />
            </Form.Item>
          );
        }
      })}
    </>
  );
};

FormListComponent.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FormListComponent;
