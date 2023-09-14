import React from 'react';
import HeaderInvoice from '../features/invoices/components/headerInvoice/HeaderInvoice';
import TableInvoice from '../features/invoices/components/tableInvoice/TableInvoice';
import { brandTheme } from '../styles/brandTheme';

const Invoices = ({ type }) => {
  const data =
    type === 'debet'
      ? {
          color: brandTheme.token.colorInfo,
          title: 'Реализация товара со склада',
          imgSrc: '/clients.svg',
        }
      : {
          color: brandTheme.token.colorPrimary,
          title: 'Приход товара на склад',
          imgSrc: '/suppliers.svg',
        };

  return (
    <>
      <HeaderInvoice data={data} />

      <TableInvoice />
    </>
  );
};

export default Invoices;
