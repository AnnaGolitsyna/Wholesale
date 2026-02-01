export const OPERATION_TYPES = {
  DEBET: 'debet',
  CREDIT: 'credit',
  SALE: 'sale',
  PURCHASE: 'purchase',
  PAYMENTS: 'payments',
};

export const operationTypes = {
  [OPERATION_TYPES.SALE]: {
    [OPERATION_TYPES.DEBET]: {
      text: 'Продажа',
      textToPrint: 'Продаж',
      color: 'success',
    },
    [OPERATION_TYPES.CREDIT]: {
      text: 'Возврат',
      textToPrint: 'Повернення',
      color: 'warning',
    },
    modalDetails: {
      [OPERATION_TYPES.DEBET]: {
        titleText: 'Расходная накладная (покупателю)',
        titleToPrint: 'Видаткова накладна',
        radioBtnText: 'Продажа товара покупателю',
      },
      [OPERATION_TYPES.CREDIT]: {
        titleText: 'Возвратная накладная (на склад)',
        titleToPrint: 'Накладна на повернення (на склад)',
        radioBtnText: 'Возврат на склад от покупателя',
      },
    },
  },
  [OPERATION_TYPES.PURCHASE]: {
    [OPERATION_TYPES.DEBET]: {
      text: 'Возврат',
      textToPrint: 'Повернення',
      color: 'warning',
    },
    [OPERATION_TYPES.CREDIT]: {
      text: 'Приход',
      textToPrint: 'Отримання',
      color: 'success',
    },
    modalDetails: {
      [OPERATION_TYPES.DEBET]: {
        titleText: 'Возвратная накладная (поставщику)',
        titleToPrint: 'Накладна на повернення (постачальнику)',
        radioBtnText: 'Возврат поставщику',
      },
      [OPERATION_TYPES.CREDIT]: {
        titleText: 'Приходная накладная (от поставщика)',
        titleToPrint: 'Накладна на отримання товару',
        radioBtnText: 'Приход от поставщика',
      },
    },
  },
  [OPERATION_TYPES.PAYMENTS]: {
    [OPERATION_TYPES.CREDIT]: {
      text: 'В кассу',
      textToPrint: 'На рахунок',
      color: 'success',
    },
    [OPERATION_TYPES.DEBET]: {
      text: 'Из кассы',
      textToPrint: 'Сплачено',
      color: 'warning',
    },
    modalDetails: {
      [OPERATION_TYPES.DEBET]: {
        titleText: 'Оплата сделана со счета',
        titleToPrint: 'Зроблено оплату',
      },
      [OPERATION_TYPES.CREDIT]: {
        titleText: 'Оплата получена на счет',
        titleToPrint: 'Отримано оплату',
      },
    },
  },
};
