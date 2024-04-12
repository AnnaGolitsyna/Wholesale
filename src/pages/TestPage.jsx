import React from 'react';
import { GoodsPage } from './Goods';

import { Typography, DatePicker, Divider } from 'antd';

import { Space, Skeleton } from 'antd';
import { DotChartOutlined } from '@ant-design/icons';

const TestPage = () => {
  return (
    <>


      <Divider />
      <Typography.Text>TEST</Typography.Text>
      <DatePicker placeholder="дата" format="YYYY-MM-DD" />
      <GoodsPage />
    </>
  );
};

export default TestPage;
