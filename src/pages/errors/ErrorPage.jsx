import React from 'react';
//import PropTypes from 'prop-types',
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Result } from 'antd';


const ErrorPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { errorData } = location.state || {};

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <Result
      status="404"
      title="Извините, такой страницы не существует"
      subTitle={errorData && <p>Error Details: {errorData.message}</p>}
      extra={
        <Button type="primary" onClick={handleReturn}>
          На главную
        </Button>
      }
    ></Result>
  );
};

//ErrorPage.propTypes = {}

export default ErrorPage;
