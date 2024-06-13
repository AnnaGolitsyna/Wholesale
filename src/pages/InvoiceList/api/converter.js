import { getShortDateFormat } from '../../../utils/dateUtils';
import { formattedPrice } from '../../../utils/priceUtils';

const invoiceConverter = {
  toFirestore(invoice) {
    const { date, profit, ...rest } = invoice;
    const formattedProfit = profit ? { profit: formattedPrice(profit) } : {};

    return {
      ...rest,
      date: getShortDateFormat(date),
      ...formattedProfit,
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
