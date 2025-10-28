export {
  addTransactionIntoReceivable,
  updateTransactionInReceivable,
  deleteTransactionInReceivable,
  updateHistoryReceivable,
  handleTransactionInReceivable,
} from './api/operations';

export { getReceivableDocRef, getReceivableListRef } from './api/firebaseRefs';

export { AdaptiveReceivablePage as default } from './components/receivablePage/AdaptiveReceivablePage';
