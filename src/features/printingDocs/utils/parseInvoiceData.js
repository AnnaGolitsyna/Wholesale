import { myCompanysData } from '../../../constants/companysData';
import { getLocalShortDateFormat } from '../../../utils/dateUtils';
import { OPERATION_TYPES } from '../../../constants/operationTypes';
const parseInvoiceData = (templateFields, modalDetails, data) => {
  const {
    fields: { checkedValues: defaultCheckedValues, requiredFieldsList } = {},
    options: { optionsCheckbox: optionsList } = {},
    btnText: { showBtn: showBtnText },
  } = templateFields;

  const title = `${modalDetails[data.type].titleToPrint} № ${
    data.docNumber
  } від ${getLocalShortDateFormat(data.date)}`;

  const companysName =
    data.type === OPERATION_TYPES.CREDIT
      ? {
          sender: null,
          recipient: myCompanysData,
          isShowRole: true,
        }
      : { sender: myCompanysData, recipient: null, isShowRole: true };

  return {
    companysName,
    defaultCheckedValues,
    requiredFieldsList,
    optionsList,
    title,
    showBtnText,
  };
};

export { parseInvoiceData };
