import { myCompanysData } from '../../../constants/companysData';
import { getLocalShortDateFormat } from '../../../utils/dateUtils';
const parseInvoiceData = (templateFields, modalDetails, data) => {
  const {
    fields: { checkedValues: defaultCheckedValues, requiredFieldsList } = {},
    options: { optionsCheckbox: optionsList } = {},
  } = templateFields;

  const title = `${modalDetails[data.type].titleToPrint} № ${
    data.docNumber
  } від ${getLocalShortDateFormat(data.date)}`;

  const companysName =
    data.type === 'credit'
      ? {
          sender: null,
          recipient: myCompanysData,
          isShowRole: true,
        }
      : { sender: myCompanysData, recipient: null, isShowRole: true };

  const btnText = 'На печать';

  return {
    companysName,
    defaultCheckedValues,
    requiredFieldsList,
    optionsList,
    title,
    btnText,
  };
};

export { parseInvoiceData };
