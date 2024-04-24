import { getShortDateFormat } from '../../../utils/dateUtils';

const paymentConverter = {
  toFirestore(value) {
    return { ...value, date: getShortDateFormat(value.date) };
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

export default paymentConverter;
