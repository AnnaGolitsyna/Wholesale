import { useState, useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getTemplateRef, getPlanByMonthRef } from '../api/firebaseRef';
import {
  updatePlanRow,
  createPlanRow,
  deletePlanRow,
  generatePlanFromTemplate,
} from '../api/operations';

const useFinancePlan = (year, month) => {
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [planSnapshot, loading, firebaseError] = useCollection(
    getPlanByMonthRef(year, month)
  );
  const [templateSnapshot] = useCollection(getTemplateRef());

  const plan = planSnapshot?.docs.map((d) => ({ id: d.id, ...d.data() })) ?? [];
  const template = templateSnapshot?.docs.map((d) => ({ id: d.id, ...d.data() })) ?? [];
  const error = firebaseError?.message || null;
  const isEmpty = !loading && plan.length === 0;

  const groupedByDate = useMemo(
    () =>
      plan.reduce((acc, row) => {
        if (!acc[row.date]) acc[row.date] = [];
        acc[row.date].push(row);
        return acc;
      }, {}),
    [plan]
  );

  const updateRow = async (id, fields) => {
    setSaving(true);
    try {
      await updatePlanRow(id, fields);
    } finally {
      setSaving(false);
    }
  };

  const addRow = async (fields) => {
    setSaving(true);
    try {
      await createPlanRow({ ...fields, is_manual: true });
    } finally {
      setSaving(false);
    }
  };

  const deleteRow = async (id) => {
    setSaving(true);
    try {
      await deletePlanRow(id);
    } finally {
      setSaving(false);
    }
  };

  const generatePlan = async () => {
    setGenerating(true);
    try {
      await generatePlanFromTemplate(template, year, month);
    } finally {
      setGenerating(false);
    }
  };

  return {
    groupedByDate,
    loading,
    error,
    saving,
    generating,
    isEmpty,
    updateRow,
    addRow,
    deleteRow,
    generatePlan,
  };
};

export default useFinancePlan;
