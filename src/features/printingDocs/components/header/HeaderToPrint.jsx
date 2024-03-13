import React from 'react';
//import PropTypes from 'prop-types'
import { Space, Typography } from 'antd';

const HeaderToPrint = ({ title }) => {
  return (
    <Space direction="vertical">
      {title?.map(({ label, name }) =>
        !label ? (
          <Typography.Text strong type="success" key={name}>
            {name}
          </Typography.Text>
        ) : (
          <Typography.Text italic type="success" key={name}>
            {`${label} : ${name}`}
          </Typography.Text>
        )
      )}
    </Space>
  );
};

//HeaderToPrint.propTypes = {}

export default HeaderToPrint;
