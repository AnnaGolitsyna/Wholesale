import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';
import { generateFormItem } from './generateFormItem';

const FormListComponent = ({ data }) => {
  return (
    <>
      {data?.map(({ keyname, children, ...itemProps }) =>
        !children ? (
          generateFormItem({ keyname, ...itemProps })
        ) : (
          <Space
            key={keyname}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'stretch',
            }}
          >
            {children.map((childProps) => generateFormItem(childProps))}
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
