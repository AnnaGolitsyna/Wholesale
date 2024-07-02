const getPageStyle = () => {
  return ` @page {
        margin: 40px;
      }
      @media print {
        .ant-table {
          font-size: 13px;
        }
        .ant-table-thead > tr > th,
        .ant-table-tbody > tr > td {
          border: 0.3px solid #bfbfbf !important;
          padding: 8px !important;
        }
        .ant-table-thead > tr > th {
          font-weight: bold !important;
        }
        .ant-table-cell {
          border-bottom: none !important;
        }
        .ant-table-cell::before {
          display: none !important;
        }
      }
    `;
};

export { getPageStyle }