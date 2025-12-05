import { useState, useRef } from 'react';
import { scheduleType } from '../../../constants/productsDetail';
import { PRINT_STYLESHEET } from '../constants/printStyles';

/**
 * Custom hook for schedule card printing functionality
 * @param {Object} schedule - Schedule object with date, scheduleName, docNumber
 * @param {string} activeTab - Current active tab ('saved-all', 'saved-nextWeek', etc.)
 * @returns {Object} Print state and handlers
 */
export const usePrintScheduleCard = (schedule, activeTab) => {
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

    const printWindow = window.open('', '', 'width=1200,height=800');

    const title =
      activeTab === 'saved-all'
        ? `Раскладка от ${schedule.date} - ${
            scheduleType[schedule.scheduleName]?.label
          }`
        : `Раскладка - ${scheduleType[schedule.scheduleName]?.label}`;

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
