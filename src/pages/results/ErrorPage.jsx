import React from 'react';
//import PropTypes from 'prop-types',
import { useNavigate, useLocation } from 'react-router-dom';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
const { Paragraph, Text } = Typography;

const ErrorPage = (props) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { errorData } = location.state || {};

  const handleReturn = () => {
    navigate(-1);
  };

  console.log(errorData);
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
