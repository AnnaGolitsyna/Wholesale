import React, { useReducer, useEffect, useMemo } from 'react';
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
import {
  initialState,
  ACTION_TYPES,
  contractorReceivableReducer,
} from '../../state/contractorReceivableReducer';
import { updateHistoryReceivable } from '../../../Receivable';

import { getShortDateFormat, getToday } from '../../../../utils/dateUtils';

const ContractorReceivableContext = React.createContext();

const ContractorReceivablePage = () => {
  const { id } = useParams();
  
  const [state, dispatch] = useReducer(
    contractorReceivableReducer,
    initialState
  );

  const {
    loading,
    accountData,
    openingBalance,
    closingBalance,
    reconciledTransactions,
    accountName,
  } = useAccountReconciliation(id, state.datesPeriod);

  const toggleView = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_VIEW });
  };

  const handleDateChange = (dates) => {
    dispatch({ type: ACTION_TYPES.SET_DATE_PERIOD, payload: dates });
  };

  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.SET_BTN_DISABLED,
      payload: reconciledTransactions.length === 0 || state.showAnalytics,
    });
  }, [reconciledTransactions, state.showAnalytics]);

  const handleSubmitHistory = () => {
    const newKey = `${getShortDateFormat(
      state.datesPeriod[0]
    )}/${getShortDateFormat(state.datesPeriod[1])}`;
    const newItem = {
      [newKey]: {
        balanceStart: openingBalance,
        dateStart: getShortDateFormat(state.datesPeriod[0]),
        balanceEnd: closingBalance,
        dateEnd: getShortDateFormat(state.datesPeriod[1]),
        isConfirm: false,
        notes: `создано ${getToday()}`,
      },
    };
    const newHistoryList = { ...accountData.historyList, ...newItem };

    updateHistoryReceivable(id, newHistoryList);
  };

  // const contextValue = useMemo(
  //   () => ({
  //     ...state,
  //     accountName,
  //     openingBalance,
  //     closingBalance,
  //     toggleView,
  //     handleDateChange,
  //     handleSubmitHistory,
  //   }),
  //   [state, accountName, openingBalance, closingBalance]
  // );
  const contextValue = useMemo(
    () => ({
      id,
      accountData,
      loading,
     // error,
      openingBalance,
      closingBalance,
      accountName,
      toggleView,
      handleDateChange,
      handleSubmitHistory,
      ...state,
    }),
    [
      id,
      accountData,
      loading,
    //  error,
      openingBalance,
      closingBalance,
      accountName,
      state,
    ]
  );

  if (loading) return <PageSkeleton />;

  return (

    <ContractorReceivableContext.Provider value={contextValue}>
      <Flex vertical style={{ height: '100%', position: 'relative' }}>
        <PageHeader />
        {state.showAnalytics ? (
          <ChartBlock contractorId={id} />
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
