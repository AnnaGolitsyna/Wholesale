// src/hooks/useClientReturns.js
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQzpwFGm5KLITewf4stePSYiksHycM26yv0NAL-Gh4YBHLqL5hcDnM1Y01h3VO6pAmoQg_JGWN3UJ9n/pub?gid=1772674306&single=true&output=csv';

const useClientReturns = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await fetch(SHEET_CSV_URL);
        const text = await response.text();

        // Parse CSV
        const rows = text.split('\n').slice(1); // Skip header row

        const parsedData = rows
          .map((row) => {
            const columns = row.split(',');
            return {
              date: columns[0]?.trim(),
              name: columns[1]?.trim(),
              number: columns[2]?.trim(),
              category: columns[3]?.trim(),
              operationType: columns[4]?.trim(),
            };
          })
          .filter(
            (item) =>
              item.operationType === 'Возврат' && // Only returns
              item.date && // Has valid date
              item.name, // Has valid name
          );

        // Group by date
        const groupedByDate = parsedData.reduce((acc, item) => {
          const date = item.date;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        }, {});

        // Convert to array format sorted by date (newest first)
        const groupedArray = Object.entries(groupedByDate)
          .map(([date, items]) => ({
            date,
            items,
            sortDate: dayjs(date, 'DD.MM.YYYY').unix(),
          }))
          .sort((a, b) => b.sortDate - a.sortDate);

        setReturns(groupedArray);

        // Extract unique categories for filter
        const uniqueCategories = [
          ...new Set(parsedData.map((item) => item.category)),
        ];
        setCategories(uniqueCategories.filter(Boolean));
      } catch (error) {
        console.error('Error fetching returns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  return { returns, loading, categories };
};

export default useClientReturns;
