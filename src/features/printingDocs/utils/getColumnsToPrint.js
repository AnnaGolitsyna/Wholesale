import { getPriceListColumns } from '../../../pages/Goods';
import { getPrintProductListColumns } from '../../../pages/InvoiceList';
import {receivableTableColumns} from '../../../pages/ContractorReceivable';
import { FORM_TYPES } from '../../../constants/formTypes';


export const getColumnsToPrint = (data, type, selectedFields) => {
  const COLUMNS = {
    [FORM_TYPES.PRINT_INVOICE]: getPrintProductListColumns(),
    [FORM_TYPES.PRINT_PRICELIST]: getPriceListColumns(data),
    [FORM_TYPES.PRINT_RECEIVABLE]: receivableTableColumns,
  };
  // const columns =
  //   type === 'priceList'
  //     ? getPriceListColumns(data)
  //     : getPrintProductListColumns();
  const columnsToPrint = COLUMNS[type].filter(({ dataIndex }) =>
    selectedFields.includes(dataIndex)
  );
  console.log('columnsToPrint', columnsToPrint, selectedFields);

  return columnsToPrint;
};
