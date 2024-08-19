import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Space } from 'antd';

const NavLinkWithIcon = ({ path, LincIcon, text }) => {
  return (
    <NavLink to={path} style={{ fontStyle: 'italic' }}>
      <Space>
        {LincIcon}
        {text}
      </Space>
    </NavLink>
  );
};

NavLinkWithIcon.propTypes = {
  path: PropTypes.string.isRequired,
  LincIcon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavLinkWithIcon;
