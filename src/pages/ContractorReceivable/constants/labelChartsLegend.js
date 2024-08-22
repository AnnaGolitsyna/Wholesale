import { OPERATION_TYPES } from '../../../constants/operationTypes';

const LABEL_CHARTS_LEGEND = {
  [OPERATION_TYPES.DEBET]: 'Отгружено',
  [OPERATION_TYPES.CREDIT]: 'Получено',
  [OPERATION_TYPES.PAYMENTS]: 'Оплачено',
};

export { LABEL_CHARTS_LEGEND }
