import { getShortDateFormat } from '../../../utils/dateUtils';

const invoiceConverter = {
  toFirestore(invoice) {
    const { date, ...rest } = invoice;
    console.log('test', invoice, getShortDateFormat(invoice));
    return {
      ...rest,
      date: getShortDateFormat(date) || null,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
      key: snapshot.id,
    };
  },
};

export default invoiceConverter;
