/**
 * Print stylesheet generator for schedule card table
 * @param {string} orientation - Print orientation ('portrait' or 'landscape')
 * @returns {string} CSS stylesheet string
 */
export const PRINT_STYLESHEET = (orientation) => `
  /* Reset all AntD cell weights */
  /* FORCE real table to behave like 1 grid */

  body {
    font-family: 'Roboto', sans-serif !important;
  }

  .ant-table table {
    border-collapse: collapse !important;
    border-spacing: 0 !important;
  }

  /* Override AntD cell borders */
  .ant-table-cell {
    border: 1px solid #000 !important;
    font-family: 'Roboto', sans-serif !important;
    padding: 5px !important;
  }

  /* Header always bold */
  thead .ant-table-cell {
    font-weight: bold !important;
  }

  /* BASIC ROWS (bold) */
  tbody tr:not(.top-summary-row):not(.summary-row):not(.group-header):not(.difference-row) .ant-table-cell {
    font-weight: bold !important;
    font-size: 20px !important;
  }

  /* GROUP HEADER */
  .group-header .ant-table-cell {
    font-weight: normal !important;
    font-size: 18px !important;
  }

  /* SUMMARY ROW */
  .summary-row .ant-table-cell {
    font-weight: normal !important;
    font-size: 20px !important;
  }

  /* TOP SUMMARY ROWS */
  .top-summary-row .ant-table-cell {
    font-weight: normal !important;
    font-size: 18px !important;
  }

  /* DIFFERENCE ROW */
  .difference-row .ant-table-cell {
    font-weight: normal !important;
    font-size: 18px !important;
  }

  /* Base table styling */
  table, th, td {
    background: none !important;
  }

  /* Print orientation */
  @media print {
    @page {
      size: ${orientation};
      margin: 10mm;
    }
  }
`;
