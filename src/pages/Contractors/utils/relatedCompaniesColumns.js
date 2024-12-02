import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import SupportIcon from '../../../styles/icons/SupportIcon';
import { AddOnModal } from '../../../features/modifyingItems';
import { FORM_TYPES, FORM_ACTIONS } from '../../../constants/formTypes';

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
      <AddOnModal
        data={record}
        typeData={FORM_TYPES.CONTRACTOR_ADDITIONAL}
        actionType={FORM_ACTIONS.EDIT}
      />
    ),
  },
];
