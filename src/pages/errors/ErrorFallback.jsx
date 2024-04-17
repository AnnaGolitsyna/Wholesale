import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the homepage
  };

  return (
    <Result
      status="404"
      title="Что-то пошло не так..."
      subTitle={error?.stack}
      extra={
        <Button type="primary" onClick={handleGoHome}>
          На главную страницу
        </Button>
      }
    />
  );
};

ErrorFallback.propTypes = {};

export default ErrorFallback;
