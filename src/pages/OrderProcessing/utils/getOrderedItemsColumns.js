import { Input, InputNumber, Tag } from 'antd';
import ConfirmDeletionIcon from '../../../components/popConfirm/ConfirmDeletionIcon';
import { refundsType, scheduleType } from '../../../constants/productsDetail';

/**
 * Helper function to generate dynamic filters for the 'label' column
 * Call this function with your data array to populate label filters
 *
 * @param {Array} data - Array of ordered items
 * @returns {Array} - Array of unique product labels for filtering
 *
 * Usage example:
 * const columns = orderedItemsColumns;
 * columns[0].filters = getProductLabelFilters(dataSource);
 */
export const getProductLabelFilters = (data) => {
  console.log('data', data);
  
  const uniqueLabels = [...new Set(data?.map((item) => item.label))];
  return uniqueLabels.sort().map((label) => ({
    text: label,
    value: label,
  }));
};

export const getOrderedItemsColumns = (dataSource = [], onDelete) => [
  {
    title: 'Наименование товара',
    dataIndex: 'label',
    key: 'label',
    filters: getProductLabelFilters(dataSource),
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.label === value,
  },
  {
    title: 'Количество',
    dataIndex: 'count',
    key: 'count',
    width: 120,
    align: 'center',
    editable: true,
    render: (_, record) => {
      return <Input value={record.count} />;
    },
  },
  {
    title: 'График',
    dataIndex: 'scedule',
    key: 'scedule',
    width: 120,
    align: 'center',
    filters: Object.keys(scheduleType).map((key) => ({
      text: scheduleType[key].label,
      value: key,
    })),
    onFilter: (value, record) => record.scedule === value,
    render: (scedule) => (
      <Tag color={scheduleType[scedule]?.color} bordered={false}>
        {scheduleType[scedule]?.label}
      </Tag>
    ),
  },
  {
    title: 'Возврат',
    dataIndex: 'refundsType',
    key: 'refundsType',
    width: 120,
    align: 'center',
    render: (type) => (
      <Tag color={refundsType[type]?.color} bordered={false}>
        {refundsType[type]?.label}
      </Tag>
    ),
  },
  {
    title: 'Удалить',
    dataIndex: 'action',
    // ✅ Use the passed delete handler
    render: (_, record) => (
      <ConfirmDeletionIcon handleClick={() => onDelete?.(record.key)} />
    ),
    width: '5%',
  },
];
