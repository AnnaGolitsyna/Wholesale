import React from 'react';
import PropTypes from 'prop-types';
import PriceListContent from '../contentComponent/PriceListContent';
import InvoiceContent from '../contentComponent/InvoiceContent';
import { TransactionsTable } from '../../../../pages/ContractorReceivable';
import { FORM_TYPES } from '../../../../constants/formTypes';

const CONTENT_COMPONENTS = {
  [FORM_TYPES.PRINT_INVOICE]: InvoiceContent,
  [FORM_TYPES.PRINT_PRICELIST]: PriceListContent,
  [FORM_TYPES.PRINT_RECEIVABLE]: TransactionsTable,
};

const PrintContentHandler = ({ type, ...props }) => {
  const ContentComponent = CONTENT_COMPONENTS[type];

  if (!ContentComponent) {
    return null;
  }

  if (type === FORM_TYPES.PRINT_INVOICE) {
    return <ContentComponent {...props} />;
  }

  if (type === FORM_TYPES.PRINT_PRICELIST) {
    const { data, columns, title } = props;
    return <ContentComponent data={data} columns={columns} title={title} />;
  }

  return <ContentComponent />;
};

PrintContentHandler.propTypes = {
  type: PropTypes.oneOf(Object.values(FORM_TYPES)).isRequired,
  data: PropTypes.object,
  columns: PropTypes.array,
  namesType: PropTypes.string,
  companysName: PropTypes.object,
  title: PropTypes.string,
  isDuble: PropTypes.bool,
};

export default PrintContentHandler;
