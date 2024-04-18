import React from 'react';
import PropTypes from 'prop-types';
import { Result, Typography } from 'antd';

const ErrorFallbackModal = ({ error, resetErrorBoundary }) => {
  return (
    <Result status="500" title="Что-то пошло не так...">
      <Typography.Paragraph
        ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}
      >
        {error?.stack}
      </Typography.Paragraph>
    </Result>
  );
};

ErrorFallbackModal.propTypes = {
  error: PropTypes.shape({
    stack: PropTypes.string,
  }),
  resetErrorBoundary: PropTypes.func,
};

export default ErrorFallbackModal;
