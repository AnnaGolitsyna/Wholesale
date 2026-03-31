import { updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import {
  getTemplateDocRef,
  getPlanRef,
  getPlanDocRef,
} from './firebaseRef';

export const updateTemplateAmount = async (recordId, amount) => {
  const ref = getTemplateDocRef(recordId);
  await updateDoc(ref, { amount });
};

export const updateTemplateRow = async (recordId, fields) => {
  const ref = getTemplateDocRef(recordId);
  await updateDoc(ref, fields);
};

// ─── Plan operations ───────────────────────────────────────────────────────────

export const updatePlanRow = async (recordId, fields) => {
  const ref = getPlanDocRef(recordId);
  await updateDoc(ref, fields);
};

export const createPlanRow = async (fields) => {
  const ref = getPlanRef();
  const newDoc = await addDoc(ref, fields);
  return { id: newDoc.id, ...fields };
};

export const deletePlanRow = async (recordId) => {
  const ref = getPlanDocRef(recordId);
  await deleteDoc(ref);
};
 
// ─── Utils ─────────────────────────────────────────────────────────────────────
 
export const getFridaysInMonth = (year, month) => {
  const fridays = [];
  const date = new Date(year, month - 1, 1);
  while (date.getDay() !== 5) date.setDate(date.getDate() + 1);
  while (date.getMonth() === month - 1) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    fridays.push(`${y}-${m}-${d}`);
    date.setDate(date.getDate() + 7);
  }
  return fridays;
};
 
export const generatePlanFromTemplate = async (template, year, month) => {
  const fridays = getFridaysInMonth(year, month);
  const rows = [];
 
  template.forEach((item) => {
    if (item.period === 'Еженедельно') {
      fridays.forEach((date) => {
        rows.push({
          date,
          name: item.name,
          fop: item.fop,
          amount: item.amount ?? 0,
          payment_type: item.payment_type,
          is_manual: false,
          template_id: item.id,
        });
      });
    } else if (item.period === 'Ежемесячно' && item.week_of_month) {
      const friday = fridays[item.week_of_month - 1];
      if (friday) {
        rows.push({
          date: friday,
          name: item.name,
          fop: item.fop,
          amount: item.amount ?? 0,
          payment_type: item.payment_type,
          is_manual: false,
          template_id: item.id,
        });
      }
    }
    // По требованию — skipped, added manually
  });
 
  // Write all rows to Firestore
  const planRef = getPlanRef();
  const created = [];
  for (const row of rows) {
    const newDoc = await addDoc(planRef, row);
    created.push({ id: newDoc.id, ...row });
  }
 
  return created;
};