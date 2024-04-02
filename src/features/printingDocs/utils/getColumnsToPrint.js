import { getPriceListColumns } from '../../../pages/Goods';
export const getColumnsToPrint = (data, type, selectedFields) => {
  const columns = type === 'priceList' && getPriceListColumns(data);
  const columnsToPrint = columns.filter(({ dataIndex }) =>
    selectedFields.includes(dataIndex)
  );
  return columnsToPrint;
};
