import React from 'react';
import HeaderRegister from '../components/headerRegister/HeaderRegister';
import ModalInvoice from '../components/modalInvoice/ModalInvoice';
import TableInvoice from '../components/tableInvoice/TableInvoice';
import { brandTheme } from '../../../styles/brandTheme';

const InvoicesList = ({ type }) => {
  const data =
    type === 'sale'
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
      <HeaderRegister data={data} type={type} />
      <TableInvoice bgColor={data.color}/>
    </>
  );
};

export default InvoicesList;
