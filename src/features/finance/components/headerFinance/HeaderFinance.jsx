// import React from 'react';
// //import PropTypes from 'prop-types'
// import { Typography, Button, Space, Input, Image, DatePicker } from 'antd';
// import SearchIcon from '../../../../styles/icons/SearchIcon';
// import DownloadIconSvg from '../../../../styles/icons/DownloadIcon';
// import UploadIcon from '../../../../styles/icons/UploadIcon';

// import { getThreeMonthsInterval } from '../../../../utils/dateUtils';

// const HeaderFinance = ({
//   showModal,
//   handleSearch,
//   datesInterval,
//   handleDatePickerChange,
// }) => {
//   const onChange = (e) => {
//     // handleSearchChange(e.target.value);
//     console.log('header', e.target.value);
//     handleSearch(e.target.value);
//   };

//   const onChangeDate = (date, dateString) => {
//     console.log(date, dateString);
//     handleDatePickerChange(date);
//   };

//   return (
//     <Space style={{ display: 'flex', justifyContent: 'space-around' }}>
//       <Space direction="vertical" align="center">
//         <Typography.Title>Список оплат контрагентов</Typography.Title>
//         <Space>
//           <SearchIcon />
//           <Input
//             placeholder="наименование контрагента"
//             onChange={onChange}
//             allowClear
//           />
//           <DatePicker.RangePicker
//             defaultValue={datesInterval}
//             format="YYYY-MM-DD"
//             onChange={onChangeDate}
//           />
//         </Space>

//         <Space>
//           <DownloadIconSvg />
//           <Button type="primary" onClick={() => showModal(null, 'create')}>
//             Внести новую оплату
//           </Button>
//           <UploadIcon />
//         </Space>
//       </Space>
//       <Space>
//         <Image src="/money.svg" height="200px" width="100%" preview={false} />
//       </Space>
//     </Space>
//   );
// };

// //HeaderFinance.propTypes = {}

// export default HeaderFinance;
