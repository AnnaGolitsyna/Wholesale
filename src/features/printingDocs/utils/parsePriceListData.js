import { myCompanysData } from '../../../constants/companysData';

const parsePriceListData = (templateFields) => {
  const {
    // names: { sender, recipient, isShowRole } = {},
    fields: { checkedValues: defaultCheckedValues, requiredFieldsList } = {},
    options: { optionsCheckbox: optionsList } = {},
    title: { text: title } = {},
  } = templateFields;

  const companysName = {
    sender: myCompanysData,
    recipient: null,
    isShowRole: false,
  };

  const btnText = 'Прайс-лист';

  return {
    companysName,
    defaultCheckedValues,
    requiredFieldsList,
    optionsList,
    title,
    btnText,
  };
};

export { parsePriceListData };
