import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getTemplateRef } from '../api/firebaseRef';
import { updateTemplateAmount, updateTemplateRow } from '../api/operations';

const useFinanceTemplate = () => {
  const [saving, setSaving] = useState(false);

  const [snapshot, loading, firebaseError] = useCollection(getTemplateRef());

  const template = snapshot?.docs.map((d) => ({ id: d.id, ...d.data() })) ?? [];
  const error = firebaseError?.message || null;

  const updateAmount = async (recordId, amount) => {
    setSaving(true);
    try {
      await updateTemplateAmount(recordId, amount);
    } finally {
      setSaving(false);
    }
  };

  const updateRow = async (recordId, fields) => {
    setSaving(true);
    try {
      await updateTemplateRow(recordId, fields);
    } finally {
      setSaving(false);
    }
  };

  return { template, loading, error, saving, updateAmount, updateRow };
};

export default useFinanceTemplate;
