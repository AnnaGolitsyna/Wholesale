import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Result, Button, Typography } from 'antd';

const ErrorFallback = ({ error, resetErrorBoundary, path }) => {
  const navigate = useNavigate();

  // const handleGoHome = () => {
  //  // navigate(-1); // to think - do you really need it?
  //  navigate('/');
  // };
  const handleGoHome = () => {
    resetErrorBoundary();
    navigate(path || '/');
  };

  return (
    <Result
      status="500"
      title="Что-то пошло не так..."
      extra={
        <>
          <Button onClick={handleGoHome}>Назад</Button>
          <Button onClick={resetErrorBoundary}>Попробовать снова</Button>
        </>
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
  path: PropTypes.string,
};

export default ErrorFallback;
