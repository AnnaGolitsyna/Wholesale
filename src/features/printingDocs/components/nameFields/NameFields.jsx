import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, Col, Row } from 'antd';
import { useGetContractorByIdQuery } from '../../../../pages/Contractors';

const NameFields = (nameList) => {
 // const { data, error } = useGetContractorByIdQuery(contractor?.value);
  console.log('nameList', nameList);
  // if (!nameList) return null;
  return (
    <Space direction="vertical">
      {nameList?.map(({ label, name }) =>
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

NameFields.propTypes = {};

export default NameFields;
