import { Typography, Tag, InputNumber } from 'antd';
import { scheduleType, refundsType } from '../../../constants/productsDetail';

/**
 * Column definitions for product selection table
 */
export const getProductSelectionColumns = (data) => {
  return [
    {
      title: 'Наименование товара',
      dataIndex: 'label',
      key: 'label',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => (a.label || '').localeCompare(b.label || ''),
      render: (label) => <Typography.Text strong>{label}</Typography.Text>,
      width: '35%',
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      editable: true,
      width: '12%',
      align: 'center',
      render: (count) => (
        <InputNumber
          min={1}
          defaultValue={1}
          value={count || 1}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'График',
      dataIndex: 'scedule',
      key: 'scedule',
      editable: true,
      width: '15%',
      align: 'center',
      render: (scedule) => {
        const scheduleInfo = scheduleType[scedule];
        return scheduleInfo ? (
          <Tag color={scheduleInfo.color} bordered={false}>
            {scheduleInfo.label}
          </Tag>
        ) : (
          <Typography.Text type="secondary">Не указан</Typography.Text>
        );
      },
    },
    {
      title: 'Возврат',
      dataIndex: 'refundsType',
      key: 'refundsType',
      editable: true,
      width: '15%',
      align: 'center',
      render: (type) => {
        const refundInfo = refundsType[type];
        return refundInfo ? (
          <Tag color={refundInfo.color} bordered={false}>
            {refundInfo.label}
          </Tag>
        ) : (
          <Typography.Text type="secondary">Не указан</Typography.Text>
        );
      },
    },
  ];
};
