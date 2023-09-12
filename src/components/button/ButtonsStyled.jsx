import React from 'react';
import { Button } from 'antd';
import { brandTheme } from '../../styles/brandTheme';
import PropTypes from 'prop-types';
import './buttonsStyled.css';

const primaryBtnStyle = {
  color: brandTheme.token.colorBgBase,
  fontWeight: '700',
};

const secondaryBtnStyle = {
  backgroundColor: brandTheme.token.colorSecondaryBtn,
  color: brandTheme.token.colorPrimary,
  fontWeight: '500',
};

const ButtonsStyled = ({ text, type }) => {
  const styled = type === 'primary' ? primaryBtnStyle : secondaryBtnStyle;
  return (
    <Button className="button" type={type} size="middle" style={styled} block>
      {text}
    </Button>
  );
};

ButtonsStyled.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'default']),
};

ButtonsStyled.defaultProps = {
  type: 'default',
};

export default ButtonsStyled;
