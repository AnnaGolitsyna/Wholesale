import { useState, useRef } from 'react';
import { scheduleType } from '../../../constants/productsDetail';
import { PRINT_STYLESHEET } from '../constants/printStyles';

/**
 * Custom hook for schedule card printing functionality
 * @param {Object} schedule - Schedule object with date, scheduleName, docNumber
 * @param {string} dataSource - Data source ('saved' or 'orders')
 * @param {Object} selectedDate - Selected date from DatePicker (dayjs object) for orders mode
 * @returns {Object} Print state and handlers
 */
export const usePrintScheduleCard = (schedule, dataSource, selectedDate) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [printOrientation, setPrintOrientation] = useState('portrait');
  const printRef = useRef(null);

  const handlePrintClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    // Validate date for orders mode
    if (dataSource !== 'saved' && !selectedDate) {
      return { error: 'Пожалуйста, выберите дату для печати' };
    }

    const printWindow = window.open('', '', 'width=1200,height=800');

    // Determine title based on dataSource
    let title;
    if (dataSource === 'saved' && schedule.date) {
      title = `Раскладка от ${schedule.date} - ${
        scheduleType[schedule.scheduleName]?.label
      }`;
    } else if (selectedDate) {
      title = `Раскладка от ${selectedDate.format('DD.MM.YYYY')} - ${
        scheduleType[schedule.scheduleName]?.label
      }`;
    } else {
      title = `Раскладка - ${scheduleType[schedule.scheduleName]?.label}`;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
          <title>${title}</title>
          <style>
            ${PRINT_STYLESHEET(printOrientation)}
          </style>
        </head>
        <body>
          <h2>${title}</h2>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);

    return { error: null };
  };

  return {
    isModalOpen,
    setIsModalOpen,
    printOrientation,
    setPrintOrientation,
    handlePrintClick,
    handleModalClose,
    handlePrint,
    printRef,
  };
};
