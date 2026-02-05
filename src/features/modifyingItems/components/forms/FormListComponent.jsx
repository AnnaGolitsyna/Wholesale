import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';
import FormItemComponent from './FormItemComponent';

const FormListComponent = ({ data }) => {
  return (
    <>
      {data?.map(({ keyname, children, compact, ...itemProps }) =>
        !children ? (
         <FormItemComponent key={keyname} compact={compact} {...itemProps} />
        ) : (
          <Space
            key={keyname}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'stretch',
            }}
          >
            {children.map((childProps) => <FormItemComponent key={childProps.keyname} {...childProps} />)}
          </Space>
        )
      )}
    </>
  );
};

FormListComponent.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FormListComponent;


