import { Input, Tag } from 'antd';
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
  const uniqueLabels = [...new Set(data?.map((item) => item.label))];
  return uniqueLabels.sort().map((label) => ({
    text: label,
    value: label,
    key: label,
  }));
};

export const getOrderedItemsColumns = (dataSource = [], onDelete, isMobile = false) => {
  const allColumns = [
    {
      title: isMobile ? 'Товар' : 'Наименование товара',
      dataIndex: 'label',
      key: 'label',
      filters: getProductLabelFilters(dataSource),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.label === value,
      sorter: (a, b) =>
        a.label.localeCompare(b.label, 'ru', { sensitivity: 'base' }),
    },
    {
      title: isMobile ? 'Кол-во' : 'Количество',
      dataIndex: 'count',
      key: 'count',
      width: isMobile ? 80 : 120,
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
        key: key,
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
      title: isMobile ? '' : 'Удалить',
      dataIndex: 'action',
      key: 'action',
      // ✅ Use the passed delete handler
      render: (_, record) => (
        <ConfirmDeletionIcon handleClick={() => onDelete?.(record.key)} />
      ),
      width: isMobile ? 30 : '5%',
    },
  ];

  // On mobile, show only label, count, and action columns
  if (isMobile) {
    return allColumns.filter((col) =>
      ['label', 'count', 'action'].includes(col.dataIndex)
    );
  }

  return allColumns;
};
