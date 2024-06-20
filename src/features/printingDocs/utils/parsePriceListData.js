const parsePriceListData = (templateFields) => {
  const {
    fields: { checkedValues: defaultCheckedValues, requiredFieldsList } = {},
    options: { optionsCheckbox: optionsList } = {},
    title: { text: title } = {},
    btnText: { showBtn: showBtnText },
  } = templateFields;

  return {
    defaultCheckedValues,
    requiredFieldsList,
    optionsList,
    title,
    showBtnText,
  };
};

export { parsePriceListData };
