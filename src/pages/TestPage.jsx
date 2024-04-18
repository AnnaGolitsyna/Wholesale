import React from 'react';
import { Typography, DatePicker, Divider } from 'antd';

import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/errors/ErrorFallback';

import TreeSelectContractor from '../components/treeSelect/TreeSelectContractor';
import { useGetContractorsListQuery } from './Contractors';
import useGetContractorsTreeSelect from '../hook/useGetContractorsTreeSelect';

const TestPage = () => {
  // const { data } = useGetContractorsListQuery(true);
  // const formattedData = data?.map(({ name, id, relatedCompanies }) => {
  //   return {
  //     title: name,
  //     value: id,
  //     children:
  //       relatedCompanies
  //         ?.filter((el) => el.active)
  //         .map(({ name, id }) => ({
  //           title: name,
  //           value: id,
  //         })) || [],
  //   };
  // });

  return (
    <>
      <TreeSelectContractor  />
      <Divider />
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
