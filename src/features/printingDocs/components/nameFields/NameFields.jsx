import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography } from 'antd';


const NameFields = ({ nameList }) => {
  if (!nameList) return null;

  return (
    <Space direction="vertical">
      {nameList.map(({ label, name }) =>
        !label ? (
          <Typography.Text strong key={`${name}${label}`}>
            {name}
          </Typography.Text>
        ) : (
          <Typography.Text italic key={`${name}${label}`}>
            {`${label}: ${name}`}
          </Typography.Text>
        )
      )}
    </Space>
  );
};

NameFields.propTypes = {
  nameList: PropTypes.array,
};

export default NameFields;
