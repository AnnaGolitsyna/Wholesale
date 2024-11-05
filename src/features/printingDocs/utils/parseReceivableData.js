import { myCompanysData } from '../../../constants/companysData';

const parseReceivableData = (templateFields) => {
  const {
    fields: { checkedValues: defaultCheckedValues, requiredFieldsList } = {},
    options: { optionsCheckbox: optionsList } = {},
    title: { text: title } = {},
    btnText: { showBtn: showBtnText },
  } = templateFields;

  const companysName = {
    sender: myCompanysData,
    recipient: null,
    isShowRole: true,
  };

  return {
    companysName,
    defaultCheckedValues,
    requiredFieldsList,
    optionsList,
    title,
    showBtnText,
  };
};

export { parseReceivableData };
