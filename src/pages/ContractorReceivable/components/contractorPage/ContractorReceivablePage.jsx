import React, { useReducer, useEffect } from 'react';
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

const ContractorReceivablePage = () => {
  const { id } = useParams();
  const [
    { showAnalytics, datesPeriod, isBtnDisabled, isToggleBtnDisabled },
    dispatch,
  ] = useReducer(contractorReceivableReducer, initialState);

  const {
    loading,
    accountData,
    openingBalance,
    closingBalance,
    reconciledTransactions,
    accountName,
  } = useAccountReconciliation(id, datesPeriod);

  const toggleView = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_VIEW });
  };

  const handleDateChange = (dates) => {
    dispatch({ type: ACTION_TYPES.SET_DATE_PERIOD, payload: dates });
  };

  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.SET_BTN_DISABLED,
      payload: reconciledTransactions.length === 0 || showAnalytics,
    });
  }, [reconciledTransactions, showAnalytics]);

  const handleSubmitHistory = () => {
    const lastIndex = reconciledTransactions.length - 1;
    const newKey = `${getShortDateFormat(datesPeriod[0])}/${getShortDateFormat(
      datesPeriod[1]
    )}`;
    const newItem = {
      [newKey]: {
        balanceStart: openingBalance,
        dateStart: getShortDateFormat(datesPeriod[0]),
        balanceEnd: closingBalance,
        dateEnd: getShortDateFormat(datesPeriod[1]),
        isConfirm: false,
        notes: `создано ${getToday()}`,
      },
    };
    const newHistoryList = { ...accountData.historyList, ...newItem };
    console.log(
      'history',
      // reconciledTransactions[0].balanceAfter,
      // reconciledTransactions[lastIndex].balanceBefore,
      // newItem,
      openingBalance,
      closingBalance,
      reconciledTransactions,
      accountName,
      accountData,
      newHistoryList
    );
    updateHistoryReceivable(id, newHistoryList);
  };

  if (loading) return <PageSkeleton />;

  return (
    <Flex vertical style={{ height: '100%', position: 'relative' }}>
      <PageHeader
        name={accountName}
        balanceStart={openingBalance}
        balanceEnd={closingBalance}
        period={datesPeriod}
        handleChange={handleDateChange}
        toggleView={toggleView}
        showAnalytics={showAnalytics}
        disabled={isBtnDisabled}
        toggleDisabled={isToggleBtnDisabled}
        onSubmitHistory={handleSubmitHistory}
      />

      {showAnalytics ? (
        <ChartBlock
          contractorId={id}
          datesPeriod={datesPeriod}
          dispatch={dispatch}
        />
      ) : reconciledTransactions.length === 0 ? (
        <AlertEmptyData name={accountName} />
      ) : (
        <TransactionsTable
          data={reconciledTransactions}
          balanceStart={openingBalance}
          balanceEnd={closingBalance}
          period={datesPeriod}
        />
      )}
    </Flex>
  );
};

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
