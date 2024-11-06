import { getPriceListColumns } from '../../../pages/Goods';
import { getPrintProductListColumns } from '../../../pages/InvoiceList';
import { receivableTableColumns } from '../../../pages/ContractorReceivable';
import { FORM_TYPES } from '../../../constants/formTypes';

export const getColumnsToPrint = (data, type, selectedFields) => {
  const columns = {
    [FORM_TYPES.PRINT_INVOICE]: getPrintProductListColumns(),
    [FORM_TYPES.PRINT_PRICELIST]: getPriceListColumns(data),
    [FORM_TYPES.PRINT_RECEIVABLE]: receivableTableColumns,
  };

  const columnsToPrint = columns[type].filter(({ dataIndex }) =>
    selectedFields.includes(dataIndex)
  );

  return columnsToPrint;
};
