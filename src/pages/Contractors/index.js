import {
  useGetContractorsListQuery as useGetMockContractorsListQuery,
  useGetContractorByIdQuery as useGetMockContractorByIdQuery,
  useAddContractorMutation as useAddMockContractorMutation,
  useUpdateContractorMutation as useUpdateMockContractorMutation,
} from './api/contractorsApi';

import {
  useFirebaseContractorsList,
  useAddContractorFirebase,
  useUpdateContractorFirebase,
  useGetContractorByIdFirebase,
} from './api/firebase/operations';

import { CURRENT_DATA_SOURCE, DATA_SOURCE } from './api/dataSourceConfig';

export { ContractorsPage as default } from './components/contractorsPage/ContractorsPage';
export { OrderedItemsTable } from './components/dynamicTable/OrderedItemsTable';

export { contractorsApi } from './api/contractorsApi';
export { getFieldsForContractorsFormList } from './utils/getFormLists';
export { getAdditionalFieldsForContractorsFormList } from './utils/getAdditionalFormLists';
export { modalContractorReducer } from './api/contractorsSlice';

export const useGetContractorsListQuery =
  CURRENT_DATA_SOURCE === DATA_SOURCE.FIREBASE
    ? useFirebaseContractorsList
    : useGetMockContractorsListQuery;

export const useGetContractorByIdQuery =
  CURRENT_DATA_SOURCE === DATA_SOURCE.FIREBASE
    ? useGetContractorByIdFirebase
    : useGetMockContractorByIdQuery;

export const useAddContractorMutation =
  CURRENT_DATA_SOURCE === DATA_SOURCE.FIREBASE
    ? useAddContractorFirebase
    : useAddMockContractorMutation;

export const useUpdateContractorMutation =
  CURRENT_DATA_SOURCE === DATA_SOURCE.FIREBASE
    ? useUpdateContractorFirebase
    : useUpdateMockContractorMutation;
