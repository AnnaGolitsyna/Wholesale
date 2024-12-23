import { useMemo } from 'react';
import { theme } from 'antd';
import { useAccountData } from '../api/useAccountData';
import { getMonthsInRange } from '../../../utils/dateUtils';
import { OPERATION_TYPES } from '../../../constants/operationTypes';
import { getOperationType } from '../utils/getOperationType';

const useGetChartData = (id, datesPeriod) => {
  const { transactionsData, loading, error } = useAccountData(id, datesPeriod);

  const { token } = theme.useToken();
  const colorsByType = {
    [OPERATION_TYPES.DEBET]: token.secondaryColorChartAreaBg,
    [OPERATION_TYPES.CREDIT]: token.primaryColorChartAreaBg,
    [OPERATION_TYPES.PAYMENTS]: token.acsentChartColor,
  };

  const months = getMonthsInRange(datesPeriod);


  const formattedData = useMemo(() => {
    if (!transactionsData || !Array.isArray(transactionsData)) {
      return [];
    }

    const defaultMonthData = {
      [OPERATION_TYPES.DEBET]: 0,
      [OPERATION_TYPES.CREDIT]: 0,
      [OPERATION_TYPES.PAYMENTS]: 0,
    };

    const data = months.map((month, index) => {
      if (!Array.isArray(transactionsData[index])) {
        return { month, ...defaultMonthData };
      }

      return transactionsData[index].reduce(
        (acc, item) => {
          const operationType = getOperationType(item);
          const sum = item.sum || 0;

          switch (operationType) {
            case OPERATION_TYPES.PAYMENTS:
              acc[OPERATION_TYPES.PAYMENTS] += sum;
              break;
            case OPERATION_TYPES.DEBET:
              acc[OPERATION_TYPES.DEBET] += sum;
              break;
            case OPERATION_TYPES.CREDIT:
              acc[OPERATION_TYPES.CREDIT] += sum;
              break;
            default:
              console.warn(`Unexpected operation type: ${operationType}`);
              break;
          }
          return acc;
        },
        { month, ...defaultMonthData }
      );
    });

    const maxValue = data.reduce((max, obj) => {
      const objMax = Math.max(
        obj[OPERATION_TYPES.DEBET],
        obj[OPERATION_TYPES.CREDIT],
        obj[OPERATION_TYPES.PAYMENTS]
      );
      return Math.max(max, objMax);
    }, 0);

    return data.map((item) => ({
      ...item,
      fullMark: maxValue,
    }));
  }, [transactionsData, months]);

  return { formattedData, loading, error, colorsByType };
};

export { useGetChartData };
