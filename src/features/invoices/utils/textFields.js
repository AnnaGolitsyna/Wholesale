const textForAllTypes = {
  sale: {
    debet: {
      title: 'Расходная накладная',
      radioText: 'Продажа товара покупателю',
    },
    credit: {
      title: 'Возвратная накладная',
      radioText: 'Возврат на склад от покупателя',
    },
    contractor: 'Покупатель',
  },
  purchase: {
    debet: {
      title: 'Приходная накладная',
      radioText: 'Получение товара от поставщика',
    },
    credit: {
      title: 'Накладная на возврат',
      radioText: 'Возврат товара поставщику',
    },
    contractor: 'Поставщик',
  },
};

export { textForAllTypes };
