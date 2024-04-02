// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Typography, Button, Space, Radio, Input, Modal } from 'antd';
// import PriceListPrint from '../priceList/PriceListPrint';
// import PriceListExcel from '../priceList/PriceListExcel';
// import NewspaperIcon from '../../../../styles/icons/NewspaperIcon';
// import NewItemIcon from '../../../../styles/icons/NewItemIcon';
// import SearchIcon from '../../../../styles/icons/SearchIcon';
// import PrintIcon from '../../../../styles/icons/PrintIcon';

// const HeaderGoods = ({
//   handleCheckboxChange,
//   handleModifyContractor,
//   handleSearchChange,
//   productsList,
// }) => {
//   const [open, setOpen] = useState(false);

//   const onChange = (e) => {
//     handleSearchChange(e.target.value);
//   };

//   return (
//     <Space
//       style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'end',
//         margin: '0 10px 10px 10px',
//       }}
//     >
//       <Space direction="vertical">
//         <Space>
//           <NewspaperIcon
//             style={{
//               fontSize: 100,
//             }}
//           />
//           <Typography.Title level={3} style={{ margin: 3 }}>
//             Список товаров
//           </Typography.Title>
//         </Space>
//         <Radio.Group
//           defaultValue="true"
//           buttonStyle="solid"
//           onChange={handleCheckboxChange}
//         >
//           <Radio.Button value="true">Товары в реализации</Radio.Button>
//           <Radio.Button value="false">Сняты с реализации</Radio.Button>
//         </Radio.Group>
//       </Space>
//       <Space direction="vertical">
//         <Space>
//           <PriceListExcel productsList={productsList} />
//           <Space>
//             <PrintIcon />
//             <Button onClick={() => setOpen(true)}>На печать</Button>
//           </Space>
//         </Space>

//         <Space>
//           <NewItemIcon />
//           <Button
//             type="primary"
//             onClick={() => handleModifyContractor(null, 'create')}
//           >
//             Создать новый товар
//           </Button>
//         </Space>
//         <Space>
//           <SearchIcon />
//           <Input
//             placeholder="наименование товара"
//             onChange={onChange}
//             allowClear
//           />
//         </Space>
//       </Space>

//       <Modal
//         centered
//         open={open}
//         onOk={() => setOpen(false)}
//         onCancel={() => setOpen(false)}
//         width="80%"
//         cancelText="Закрыть"
//         footer={null}
//       >
//         <PriceListPrint data={productsList} />
//       </Modal>
//     </Space>
//   );
// };

// HeaderGoods.propTypes = {
//   handleCheckboxChange: PropTypes.func.isRequired,
//   handleModifyContractor: PropTypes.func.isRequired,
//   handleSearchChange: PropTypes.func.isRequired,
//   productsList: PropTypes.array.isRequired,
// };

// export default HeaderGoods;
