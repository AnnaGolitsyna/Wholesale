import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import SupportIcon from '../../../../styles/icons/SupportIcon';
import AddOnModal from '../modals/AddOnModal';

export const relatedCompaniesColumns = [
  {
    title: 'Полное наименование',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Статус',
    dataIndex: 'active',
    key: 'active',
    render: (status) => (status ? <CheckOutlined /> : <StopOutlined />),
  },
  {
    title: <SupportIcon />,
    dataIndex: 'action',
    key: 'action',
    width: 80,
    fixed: 'right',
    render: (_, record) => (
      <AddOnModal typeData="Contractor" actionType="edit" data={record} />
    ),
  },
];
