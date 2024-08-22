import { OPERATION_TYPES } from '../../../constants/operationTypes';
const getOperationType = (item) =>
  item.docType === OPERATION_TYPES.PAYMENTS ? item.docType : item.type;

export { getOperationType }