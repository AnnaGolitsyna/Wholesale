import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import InvoiceHeader from '../header/InvoiceHeader';
import TableToPrint from '../table/TableToPrint';
import FooterToPrint from '../footerToPrint/FooterToPrint';

const InvoiceContent = ({
  data,
  columns,
  namesType,
  companysName,
  title,
  isDuble,
}) => {
  const { sum, name, productList } = data;

  const renderInvoice = () => (
    <>
      <InvoiceHeader
        namesType={namesType}
        companysName={companysName}
        title={title}
        contractor={name}
      />
      <TableToPrint data={productList} columns={columns} />
      <FooterToPrint companysName={companysName} sum={sum} />
    </>
  );

  return (
    <>
      {renderInvoice()}
      {isDuble && (
        <>
          <Divider />
          {renderInvoice()}
        </>
      )}
    </>
  );
};

InvoiceContent.propTypes = {
  data: PropTypes.shape({
    sum: PropTypes.number.isRequired,
    name: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired,
    productList: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  namesType: PropTypes.string.isRequired,
  companysName: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  isDuble: PropTypes.bool.isRequired,
};

export default InvoiceContent;

