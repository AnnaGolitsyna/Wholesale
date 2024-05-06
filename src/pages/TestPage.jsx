import React from 'react';
import { Typography, DatePicker, Divider } from 'antd';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/errors/ErrorFallback';

import TreeSelectContractor from '../components/treeSelect/TreeSelectContractor';
import InvoiceListPage from './InvoiceList';

const TestPage = () => {
  return (
    <>
      <InvoiceListPage type="purchase" />
      <InvoiceListPage type="sale" />
      <Divider />
      <TreeSelectContractor />
      <Typography.Text>TEST</Typography.Text>
      <DatePicker placeholder="дата" format="YYYY-MM-DD" />
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
