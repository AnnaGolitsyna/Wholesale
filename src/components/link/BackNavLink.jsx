import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const BackNavLink = ({ path, text }) => {
  return (
    <NavLink to={path}>
      <ArrowLeftOutlined style={{ marginRight: '5px' }} />
      <Typography.Link italic>{text}</Typography.Link>
    </NavLink>
  );
};

BackNavLink.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default BackNavLink;
