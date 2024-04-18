import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Result, Button, Typography } from 'antd';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
   // navigate(-1); // to think - do you really need it?
   navigate('/');
  };

  return (
    <Result
      status="500"
      title="Что-то пошло не так..."
      extra={
        <Button type="primary" onClick={handleGoHome}>
          На главную
        </Button>
      }
    >
      <Typography.Paragraph
        ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}
      >
        {error?.stack}
      </Typography.Paragraph>
    </Result>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    stack: PropTypes.string,
  }),
  resetErrorBoundary: PropTypes.func,
};

export default ErrorFallback;
