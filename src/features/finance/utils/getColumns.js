// import { Tooltip, Space } from 'antd';
// import TagPayment from '../../../components/tags/TagPayment';
// import { EditOutlined } from '@ant-design/icons';
// import SupportIcon from '../../../styles/icons/SupportIcon';
// import ConfirmDeletionIcon from '../../../components/popConfirm/ConfirmDeletionIcon';

// export const getColumns = (onClick, contractorslist) => {
//   return [
//     {
//       title: 'Контрагент',
//       dataIndex: 'name',
//       key: 'name',
//       defaultSortOrder: 'ascend',
//       //sorter: (a, b) => a.supplier.localeCompare(b.supplier),
//       // render: (name) => <>{getContractorLabelById(name, contractorslist)}</>,
//     },

//     {
//       title: 'Дата',
//       dataIndex: 'date',
//       key: 'date',
//       defaultSortOrder: 'des',
//       sorter: (a, b) => a.date.localeCompare(b.date),
//     },
//     {
//       title: 'Сумма',
//       dataIndex: 'sum',
//       key: 'sum',
//     },
//     {
//       title: 'Тип оплаты',
//       dataIndex: 'type',
//       key: 'type',
//       render: (type) => {
//         return <TagPayment type={type} />;
//       },
//     },
//     {
//       title: <SupportIcon />,
//       dataIndex: 'action',
//       key: 'action',
//       width: 80,
//       fixed: 'right',
//       render: (_, record) => {
//         return (
//           <Space size="middle">
//             <Tooltip title="Изменить">
//               <EditOutlined
//                 onClick={(e) => {
//                   const actionType = e.currentTarget.getAttribute('aria-label');
//                   onClick(record, actionType);
//                 }}
//               />
//             </Tooltip>

//             <ConfirmDeletionIcon
//               handleClick={() => onClick(record, 'delete-row')}
//             />
//           </Space>
//         );
//       },
//     },
//   ];
// };
