import React from 'react';
//import PropTypes from 'prop-types',
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Result } from 'antd';


const ErrorPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  
  const { errorData } = location.state || {};

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <Result
      status="500"
      title="500"
      subTitle={errorData && <p>Error Details: {errorData.message}</p>}
      extra={<Button onClick={handleReturn}>Вернуться на страницу</Button>}
    ></Result>
  );
};

//ErrorPage.propTypes = {}

export default ErrorPage;
