export const OPERATION_TYPES = {
  DEBET: 'debet',
  CREDIT: 'credit',
};

export const operationTypes = {
  sale: {
    debet: { text: 'Продажа', color: 'success' },
    credit: { text: 'Возврат', color: 'warning' },
    modalDetails: {
      debet: {
        titleText: 'Расходная накладная (покупателю)',
        titleToPrint: 'Видаткова накладна',
        radioBtnText: 'Продажа товара покупателю',
      },
      credit: {
        titleText: 'Возвратная накладная (на склад)',
        titleToPrint: 'Накладна на повернення (на склад)',
        radioBtnText: 'Возврат на склад от покупателя',
      },
    },
  },
  purchase: {
    debet: { text: 'Возврат', color: 'warning' },
    credit: { text: 'Приход', color: 'success' },
    modalDetails: {
      debet: {
        titleText: 'Возвратная накладная (поставщику)',
        titleToPrint: 'Накладна на повернення (постачальнику)',
        radioBtnText: 'Возврат поставщику',
      },
      credit: {
        titleText: 'Приходная накладная (от поставщика)',
        titleToPrint: 'Накладна на отримання товару',
        radioBtnText: 'Приход от поставщика',
      },
    },
  },
  payments: {
    credit: { text: 'В кассу', color: 'success' },
    debet: { text: 'Из кассы', color: 'warning' },
    modalDetails: {
      debet: {
        titleText: 'Оплата сделана со счета',
        titleToPrint: 'Зроблено оплату',
      },
      credit: {
        titleText: 'Оплата получена на счет',
        titleToPrint: 'Отримано оплату',
      },
    },
  },
};
