import { theme } from 'antd';
import { OPERATION_TYPES } from '../../../constants/operationTypes';

const useOperationColors = (type) => {
  const { token } = theme.useToken();

  const primaryColor =
    type === OPERATION_TYPES.DEBET
      ? token.positiveColorChart
      : token.negativeColorChart;

  const secondaryColor =
    type === OPERATION_TYPES.DEBET
      ? token.acsentPositiveColorChart
      : token.acsentNegativeColorChart;

  return { primaryColor, secondaryColor };
};

export { useOperationColors };
