import { getPriceListColumns } from '../../../pages/Goods';
import { getPrintProductListColumns } from '../../../pages/InvoiceList';

export const getColumnsToPrint = (data, type, selectedFields) => {
  const columns =
    type === 'priceList'
      ? getPriceListColumns(data)
      : getPrintProductListColumns();
  const columnsToPrint = columns.filter(({ dataIndex }) =>
    selectedFields.includes(dataIndex)
  );
  return columnsToPrint;
};
