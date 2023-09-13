import React from 'react';
import HeaderInvoice from '../features/invoices/components/headerInvoice/HeaderInvoice';
import TableInvoice from '../features/invoices/components/tableInvoice/TableInvoice';


const Invoices = () => {
  return (
    <>
      <HeaderInvoice />

      <TableInvoice />
    </>
  );
};

export default Invoices;


