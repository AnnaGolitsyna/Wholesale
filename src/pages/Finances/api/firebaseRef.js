import { collection, doc, query, where, orderBy } from 'firebase/firestore';
import { getFinancesCollectionRef } from '../../../api/getRef';
import { REF_CODE_TYPES } from '../../../api/refCodeTypes';

const getTemplateRef = () =>
  collection(...getFinancesCollectionRef(REF_CODE_TYPES.FINANCES_TEMPLATE));

const getTemplateDocRef = (id) =>
  doc(...getFinancesCollectionRef(REF_CODE_TYPES.FINANCES_TEMPLATE), id);

const getPlanRef = () =>
  collection(...getFinancesCollectionRef(REF_CODE_TYPES.FINANCES_PLAN));

const getPlanDocRef = (id) =>
  doc(...getFinancesCollectionRef(REF_CODE_TYPES.FINANCES_PLAN), id);

const getPlanByMonthRef = (year, month) => {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = `${year}-${String(month).padStart(2, '0')}-${String(
    new Date(year, month, 0).getDate()
  ).padStart(2, '0')}`;

  return query(
    getPlanRef(),
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    orderBy('date', 'asc')
  );
};

export { getTemplateRef, getTemplateDocRef, getPlanRef, getPlanDocRef, getPlanByMonthRef };
