import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Flex } from 'antd';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../../../components/errors/ErrorFallback';
import TransactionsTable from '../table/TransactionsTable';
import PageSkeleton from '../pageSceleton/PageSceleton';
import PageHeader from '../header/PageHeader';
import ChartBlock from '../chart/ChartBlock';
import AlertEmptyData from '../alert/AlertEmptyData';
import { useAccountReconciliation } from '../../hook/useAccountReconciliation';
import { useContractorReceivableState } from '../../hook/useContractorReceivableState';
import { useHistoryManagement } from '../../hook/useHistoryManagement';

const ContractorReceivableContext = React.createContext();

const ContractorReceivablePage = () => {
  const { id } = useParams();
  const { state, toggleView, handleDateChange, setButtonDisabled, dispatch } =
    useContractorReceivableState();


  const {
    loading,
    accountData,
    refetch,
    openingBalance,
    closingBalance,
    reconciledTransactions,
    accountName,
  } = useAccountReconciliation(id, state.datesPeriod);

  const {
    isHistoryDrawerVisible,
    setIsHistoryDrawerVisible,
    handleSubmitHistory,
    handleHistoryUpdateAndRefresh,
    handleHistoryError,
    contextHolder,
  } = useHistoryManagement(
    id,
    accountData,
    state,
    { openingBalance, closingBalance },
    refetch
  );

  useEffect(() => {
    setButtonDisabled(
      reconciledTransactions.length === 0 || state.showAnalytics
    );
  }, [reconciledTransactions, state.showAnalytics, setButtonDisabled]);

  const contextValue = useMemo(
    () => ({
      id,
      accountData,
      loading,
      openingBalance,
      closingBalance,
      accountName,
      toggleView,
      handleDateChange,
      handleSubmitHistory,
      isHistoryDrawerVisible,
      setIsHistoryDrawerVisible,
      handleHistoryUpdateAndRefresh,
      handleHistoryError,
      dispatch,
      reconciledTransactions,
      ...state,
    }),
    [
      id,
      accountData,
      loading,
      openingBalance,
      closingBalance,
      accountName,
      state,
      toggleView,
      handleDateChange,
      handleSubmitHistory,
      isHistoryDrawerVisible,
      setIsHistoryDrawerVisible,
      handleHistoryUpdateAndRefresh,
      handleHistoryError,
      dispatch,
      reconciledTransactions,
    ]
  );

  console.log('test', reconciledTransactions);


  if (loading) return <PageSkeleton />;

  return (
    <ContractorReceivableContext.Provider value={contextValue}>
      {contextHolder}
      <Flex vertical style={{ height: '100%', position: 'relative' }}>
        <PageHeader />
        {state.showAnalytics ? (
          <ChartBlock  />
        ) : reconciledTransactions.length === 0 ? (
          <AlertEmptyData name={accountName} />
        ) : (
          <TransactionsTable
            data={reconciledTransactions}
            balanceStart={openingBalance}
            balanceEnd={closingBalance}
            period={state.datesPeriod}
          />
        )}
      </Flex>
    </ContractorReceivableContext.Provider>
  );
};

export const useContractorReceivableContext = () =>
  React.useContext(ContractorReceivableContext);

const ContractorReceivablePageWithBoundary = withErrorBoundary(
  ContractorReceivablePage,
  {
    FallbackComponent: (props) => (
      <ErrorFallback {...props} path="/receivables" />
    ),
    onError(error, errorInfo) {
      console.error('Error caught by Error Boundary:', error);
      console.error('Error details:', errorInfo.componentStack);
    },
  }
);

export { ContractorReceivablePageWithBoundary };
