// import React from 'react';
// import PropTypes from 'prop-types';
// import { Typography, Button, Space, Radio } from 'antd';
// import ContractorIcon from '../../../../styles/icons/ContractorsIcon';
// import NewContractorIcon from '../../../../styles/icons/NewContractorIcon';

// const HeaderContractor = ({ handleCheckboxChange, showModal }) => {

//   return (
//     <Space
//       style={{
//         display: 'flex',
//         alignItems: 'baseline',
//         justifyContent: 'space-between',
//         margin: '0 10px 10px 10px',
//       }}
//     >
//       <Space direction="vertical">
//         <Space>
//           <ContractorIcon
//             style={{
//               fontSize: 100,
//             }}
//           />
//           <Typography.Title level={3} style={{ margin: 3 }}>
//             Список контрагентов
//           </Typography.Title>
//         </Space>
//         <Radio.Group
//           defaultValue="true"
//           buttonStyle="solid"
//           onChange={handleCheckboxChange}
//         >
//           <Radio.Button value="true">Действующие контрагенты</Radio.Button>
//           <Radio.Button value="false">Недействующие контрагенты</Radio.Button>
//         </Radio.Group>
//       </Space>
//       <Space size="middle">

//         <NewContractorIcon />
//         <Button
//           type="primary"
//           onClick={() => showModal(null, 'create')}
//         >
//           Создать нового
//         </Button>
//       </Space>
//     </Space>
//   );
// };

// HeaderContractor.propTypes = {
//   handleCheckboxChange: PropTypes.func.isRequired,
//   showModal: PropTypes.func.isRequired,
// };

// export default HeaderContractor;
