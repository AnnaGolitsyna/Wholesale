import dayjs from 'dayjs';

export const emptyGoodsObject = {
  active: true,
  name: '',
  fullName: '',
  supplier: '',
  cost: 0,
  superBulk: 0,
  bulk: 0,
  retail: 0,
  dateStart: dayjs(),
  dateEnd: null,
};
