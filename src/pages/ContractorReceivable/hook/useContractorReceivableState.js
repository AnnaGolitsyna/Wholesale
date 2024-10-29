import { useReducer, useCallback } from 'react';
import { getDefaultPeriodForRangePicker } from '../../../utils/dateUtils';
import {
  contractorReceivableReducer,
  ACTION_TYPES,
} from '../state/contractorReceivableReducer';

const initialState = {
  showAnalytics: false,
  datesPeriod: getDefaultPeriodForRangePicker(),
  isBtnDisabled: true,
  isToggleBtnDisabled: false,
};

export const useContractorReceivableState = () => {
  const [state, dispatch] = useReducer(
    contractorReceivableReducer,
    initialState
  );

  const toggleView = useCallback(() => {
    dispatch({ type: ACTION_TYPES.TOGGLE_VIEW });
  }, []);

  const handleDateChange = useCallback((dates) => {
    dispatch({ type: ACTION_TYPES.SET_DATE_PERIOD, payload: dates });
  }, []);

  const setButtonDisabled = useCallback((disabled) => {
    dispatch({ type: ACTION_TYPES.SET_BTN_DISABLED, payload: disabled });
  }, []);

  return {
    state,
    toggleView,
    handleDateChange,
    setButtonDisabled,
  };
};
