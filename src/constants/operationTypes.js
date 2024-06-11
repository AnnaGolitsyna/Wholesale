export const operationTypes = {
  sale: {
    debet: { text: 'Продажа', color: 'success' },
    credit: { text: 'Возврат', color: 'warning' },
  },
  purchase: {
    debet: { text: 'Возврат', color: 'warning' },
    credit: { text: 'Приход', color: 'success' },
  },
  payments: {
    credit: { text: 'В кассу', color: 'success' },
    debet: { text: 'Из кассы', color: 'warning' },
  },
};
