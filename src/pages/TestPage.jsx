import React from 'react';
import { GoodsPage } from './Goods';

import { Typography, DatePicker, Divider } from 'antd';

import { Space, Skeleton } from 'antd';
import { DotChartOutlined } from '@ant-design/icons';
import ErrorPage from './errors/ErrorPage';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './errors/ErrorFallback';

const TestPage = () => {

  return (
    <>
      <Divider />
      <Typography.Text>TEST</Typography.Text>
      <DatePicker placeholder="дата" format="YYYY-MM-DD" />
      <ErrorPage />
    </>
  );
};

export default withErrorBoundary(TestPage, {
  FallbackComponent: ErrorFallback,
  onError(error, errorInfo) {
    console.error('Error caught by Error Boundary:', error);
    console.error('Error details:', errorInfo.componentStack);
  },
});
