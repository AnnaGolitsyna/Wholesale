import { v4 as uuidv4 } from 'uuid';
import { getShortDateFormat } from '../../../../utils/dateUtils';

const goodsConverter = {
  toFirestore(goods) {
    return {
      ...goods,
      // id: goods.id || uuidv4(),
      dateStart: getShortDateFormat(goods.dateStart),
      dateEnd: getShortDateFormat(goods.dateEnd),
      cost: Number(goods.cost) || 0,
      superBulk: Number(goods.superBulk) || 0,
      bulk: Number(goods.bulk) || 0,
      retail: Number(goods.retail) || 0,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      ...data,
      key: snapshot.id,
    };
  },
};

export default goodsConverter;
