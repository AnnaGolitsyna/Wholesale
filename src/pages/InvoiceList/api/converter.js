import { getShortDateFormat } from '../../../utils/dateUtils';

const invoiceConverter = {
  toFirestore(invoice) {
    const { date, productList, ...rest } = invoice;

    const formattedProductList = productList?.map((product) => ({
      ...product,
      dateStart: product.dateStart
        ? getShortDateFormat(product.dateStart)
        : null,
      dateEnd: product.dateEnd ? getShortDateFormat(product.dateEnd) : null,
    }));

    return {
      ...rest,
      date: getShortDateFormat(date) || null,
      productList: formattedProductList || [],
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
