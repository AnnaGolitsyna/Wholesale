import { myCompanysData } from '../../../constants/companysData';

const parseDataFromSnapshot = (snapshot) => {
  const dataToPrint = snapshot.docs.reduce((acc, doc) => {
    return { ...acc, [doc.id]: doc.data() };
  }, {});

  const {
    names: { sender, recipient, isShowRole } = {},
    fields: { checkedValues: defaultCheckedValues, requiredFieldsList } = {},
    options: { optionsCheckbox: optionsList } = {},
    title: { text: title } = {},
  } = dataToPrint;

  const companysName = {
    sender: sender === 'userName' ? myCompanysData : null,
    recipient: recipient === 'userName' ? myCompanysData : null,
    isShowRole,
  };

  return {
    companysName,
    defaultCheckedValues,
    requiredFieldsList,
    optionsList,
    title,
  };
};

export default parseDataFromSnapshot;
