import React from 'react';
import { GoodsPage } from './Goods';
import { Typography, DatePicker } from 'antd';

const TestPage = () => {

  return (
    <>
      <Typography.Text>TEST</Typography.Text>
      <DatePicker placeholder="дата" format="YYYY-MM-DD" />
      <GoodsPage />
    </>
  );
};

export default TestPage;
