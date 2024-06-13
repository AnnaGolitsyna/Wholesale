import { getShortDateFormat } from '../../../utils/dateUtils';

const invoiceConverter = {
  toFirestore(invoice) {
    const { date, ...rest } = invoice;

    return {
      ...rest,
      date: getShortDateFormat(date),
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
