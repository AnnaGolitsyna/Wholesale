import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const DefaultCloseButton = React.forwardRef(({ onClick, children }, ref) => (
  <Button ref={ref} onClick={onClick}>
    {children || 'Закрыть'}
  </Button>
));

DefaultCloseButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default DefaultCloseButton;
