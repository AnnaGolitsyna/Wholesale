export const dataToPrint = {
  priceList: {
    title: 'Прайс-лист',
    companysName: {
      sender: 'userName',
      recipient: null,
      isShowRole: false,
    },
    fields: {
      requiredFieldsList: ['name', 'dateStart', 'retail'],
      checkedValues: ['superBulk', 'bulk', 'supplier'],
    },
    optionsCheckbox: [
      {
        label: 'Показать закупку',
        value: 'cost',
      },
      {
        label: 'Показать кр.опт',
        value: 'superBulk',
      },
      {
        label: 'Показать опт',
        value: 'bulk',
      },
      {
        label: 'Показать поставщика',
        value: 'supplier',
      },
    ],
  },
};
