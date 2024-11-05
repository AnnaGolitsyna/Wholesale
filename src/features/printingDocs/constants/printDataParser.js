import { FORM_TYPES } from '../../../constants/formTypes';
import { parseInvoiceData } from '../utils/parseInvoiceData';
import { parsePriceListData } from '../utils/parsePriceListData';
import { parseReceivableData } from '../utils/parseReceivableData';

export const PRINT_DATA_PARSERS = {
  [FORM_TYPES.PRINT_INVOICE]: (templateFields, modalDetails, data) =>
    parseInvoiceData(templateFields, modalDetails, data),
  [FORM_TYPES.PRINT_PRICELIST]: (templateFields) =>
    parsePriceListData(templateFields),
  [FORM_TYPES.PRINT_RECEIVABLE]: (templateFields) =>
    parseReceivableData(templateFields),
};