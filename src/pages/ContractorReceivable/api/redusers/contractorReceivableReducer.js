import { getDefaultPeriodForRangePicker } from '../../../../utils/dateUtils';

const initialState = {
  showAnalytics: false,
  datesPeriod: getDefaultPeriodForRangePicker(),
  isBtnDisabled: false,
  isToggleBtnDisabled: false,
};

const ACTION_TYPES = {
  TOGGLE_VIEW: 'TOGGLE_VIEW',
  SET_DATE_PERIOD: 'SET_DATE_PERIOD',
  SET_BTN_DISABLED: 'SET_BTN_DISABLED',
  SET_TOGGLE_BTN_DISABLED: 'SET_TOGGLE_BTN_DISABLED',
};

const contractorReceivableReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_VIEW:
      return {
        ...state,
        showAnalytics: !state.showAnalytics,
        datesPeriod: !state.showAnalytics
          ? getDefaultPeriodForRangePicker(6)
          : getDefaultPeriodForRangePicker(),
      };
    case ACTION_TYPES.SET_DATE_PERIOD:
      return {
        ...state,
        datesPeriod: action.payload,
      };
    case ACTION_TYPES.SET_BTN_DISABLED:
      return {
        ...state,
        isBtnDisabled: action.payload,
      };
    case ACTION_TYPES.SET_TOGGLE_BTN_DISABLED:
      return {
        ...state,
        isToggleBtnDisabled: action.payload,
      };
    default:
      return state;
  }
};

export {initialState, ACTION_TYPES, contractorReceivableReducer };
