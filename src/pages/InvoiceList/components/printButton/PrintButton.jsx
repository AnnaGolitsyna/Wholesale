import React from 'react';
import { Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

const PrintButton = ({ selectedItems, sortedData }) => {
  const handlePrint = () => {
    const selectedInvoices = sortedData.filter((item) =>
      selectedItems.includes(item.id),
    );

    // Generate single invoice HTML
    const generateInvoiceHtml = (record) => {
      const productRows = record.productList
        ?.slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
          (item, index) =>
            `<tr>
              <td style="border: 1px solid #000; padding: 2px; font-size: 10px;">${index + 1}</td>
              <td style="border: 1px solid #000; padding: 2px; font-size: 10px;">${item.name}</td>
              <td style="border: 1px solid #000; padding: 2px; text-align:center; font-size: 10px;">${item.count}</td>
              <td style="border: 1px solid #000; padding: 2px; text-align:right; font-size: 10px;">${((item.price ?? item.selectedPrice) || 0).toFixed(2)}</td>
              <td style="border: 1px solid #000; padding: 2px; text-align:right; font-size: 10px;">${((item.count || 0) * ((item.price ?? item.selectedPrice) || 0)).toFixed(2)}</td>
            </tr>`,
        )
        .join('') || '';

      return `
        <div style="font-family: Arial, sans-serif; font-size: 10px; padding: 5px; box-sizing: border-box;">
          <h4 style="margin: 0 0 5px 0; font-size: 11px;">Накладна № ${record.docNumber} від ${record.date}</h4>
          <p style="margin: 0 0 3px 0; font-size: 10px;"><strong>Контрагент:</strong> ${record.name?.label || ''}</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 9px;">
            <thead>
              <tr style="background: #f0f0f0;">
                <th style="border: 1px solid #000; padding: 2px; width: 20px;">№</th>
                <th style="border: 1px solid #000; padding: 2px;">Товар</th>
                <th style="border: 1px solid #000; padding: 2px; width: 35px;">Кіл.</th>
                <th style="border: 1px solid #000; padding: 2px; width: 45px;">Ціна</th>
                <th style="border: 1px solid #000; padding: 2px; width: 50px;">Сума</th>
              </tr>
            </thead>
            <tbody>${productRows}</tbody>
          </table>
          <p style="margin: 5px 0 0 0; text-align: right; font-size: 10px;"><strong>Всього: ${record.sum?.toFixed(2) ?? '0.00'}</strong></p>
        </div>
      `;
    };

    // Calculate approximate height per invoice row (header + products)
    const PAGE_HEIGHT = 297; // A4 height in mm
    const INVOICE_BASE_HEIGHT = 25; // Base height for header/footer in mm
    const ROW_HEIGHT = 5; // Height per product row in mm
    const MARGIN = 10; // Page margins in mm

    // Group invoices by page
    const pages = [];
    let currentPage = [];
    let currentPageHeight = 0;
    const availableHeight = PAGE_HEIGHT - 2 * MARGIN;

    selectedInvoices.forEach((invoice) => {
      const productCount = invoice.productList?.length || 0;
      const invoiceHeight = INVOICE_BASE_HEIGHT + productCount * ROW_HEIGHT;

      if (currentPageHeight + invoiceHeight <= availableHeight) {
        currentPage.push(invoice);
        currentPageHeight += invoiceHeight;
      } else {
        if (currentPage.length > 0) {
          pages.push(currentPage);
        }
        currentPage = [invoice];
        currentPageHeight = invoiceHeight;
      }
    });

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    // Generate print content with double invoices (left and right)
    const printContent = pages
      .map((pageInvoices) => {
        const invoicesHtml = pageInvoices
          .map((record) => {
            const invoiceHtml = generateInvoiceHtml(record);
            return `
              <div style="display: flex; border-bottom: 1px dashed #999; margin-bottom: 5px; padding-bottom: 5px;">
                <div style="flex: 1; padding-right: 5px; border-right: 1px dashed #999;">${invoiceHtml}</div>
                <div style="flex: 1; padding-left: 5px;">${invoiceHtml}</div>
              </div>
            `;
          })
          .join('');

        return `<div style="page-break-after: always;">${invoicesHtml}</div>`;
      })
      .join('');

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Накладні</title>
          <style>
            @page { size: A4; margin: 5mm; }
            @media print { body { -webkit-print-color-adjust: exact; } }
          </style>
        </head>
        <body style="margin: 0; padding: 5px;">
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onafterprint = () => printWindow.close();
    printWindow.print();
  };

  return (
    <Button
      icon={<PrinterOutlined />}
      size="small"
      type="primary"
      disabled={selectedItems.length === 0}
      onClick={handlePrint}
    >
      Печать ({selectedItems.length})
    </Button>
  );
};

export default PrintButton;
