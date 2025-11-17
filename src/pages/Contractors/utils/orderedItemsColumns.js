import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import {  Tag } from 'antd';
import SupportIcon from '../../../styles/icons/SupportIcon';
import { AddOnModal } from '../../../features/modifyingItems';
import { FORM_TYPES, FORM_ACTIONS } from '../../../constants/formTypes';

export const orderedItemsColumns = [
  {
    title: 'Наименование товара',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Количество',
    dataIndex: 'count',
    key: 'count',
    width: 120,
    align: 'center',
    render: (count) => <Tag bordered={false}>{count} шт</Tag>,
  },
  {
    title: <SupportIcon />,
    dataIndex: 'action',
    key: 'action',
    width: 80,
    fixed: 'right',
    render: (_, record) => (
      <AddOnModal
        data={record}
        typeData={FORM_TYPES.CONTRACTOR_ADDITIONAL}
        actionType={FORM_ACTIONS.EDIT}
      />
    ),
  },
];