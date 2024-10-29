import { useState, useCallback } from 'react';
import { message } from 'antd';
import { getShortDateFormat, getToday } from '../../../utils/dateUtils';
import { updateHistoryReceivable } from '../../Receivable';

const useHistoryManagement = (
  id,
  accountData,
  state,
  balances,
  refetch
) => {
  const [isHistoryDrawerVisible, setIsHistoryDrawerVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmitHistory = async () => {
    const newKey = `${getShortDateFormat(
      state.datesPeriod[0]
    )}/${getShortDateFormat(state.datesPeriod[1])}`;
    const newItem = {
      [newKey]: {
        balanceStart: balances.openingBalance,
        dateStart: getShortDateFormat(state.datesPeriod[0]),
        balanceEnd: balances.closingBalance,
        dateEnd: getShortDateFormat(state.datesPeriod[1]),
        isConfirm: false,
        notes: `создано ${getToday()}`,
      },
    };
    const newHistoryList = { ...accountData.historyList, ...newItem };

    try {
      await updateHistoryReceivable(id, newHistoryList);
      await refetch();
      messageApi.success('История успешно обновлена');
    } catch (error) {
      messageApi.error('Ошибка при обновлении истории');
      console.error('Update error:', error);
    }
  };

  const handleHistoryUpdateAndRefresh = useCallback(() => {
    refetch();
    setIsHistoryDrawerVisible(false);
    messageApi.success('История сверок успешно обновлена');
  }, [refetch, messageApi]);

  const handleHistoryError = useCallback(
    (error) => {
      messageApi.error(
        `Ошибка при обновлении истории сверок: ${error.message}`
      );
    },
    [messageApi]
  );

  return {
    isHistoryDrawerVisible,
    setIsHistoryDrawerVisible,
    handleSubmitHistory,
    handleHistoryUpdateAndRefresh,
    handleHistoryError,
    contextHolder,
  };
};

export { useHistoryManagement };
