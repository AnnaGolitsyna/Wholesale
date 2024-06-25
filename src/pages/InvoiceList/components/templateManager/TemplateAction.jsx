import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from 'antd';
import { BUTTON_STYLE, ICON_STYLE } from './style';

const TemplateAction = ({ Icon, text, onClick }) => (
  <Button style={BUTTON_STYLE} onClick={onClick}>
    <Icon style={ICON_STYLE} />
    <Typography.Text>{text}</Typography.Text>
  </Button>
);

TemplateAction.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TemplateAction;


