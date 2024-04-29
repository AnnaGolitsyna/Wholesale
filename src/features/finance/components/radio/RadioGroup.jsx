// import React from 'react';
// import PropTypes from 'prop-types'
// import { Radio, Space } from 'antd';
// import DownloadIconSvg from '../../../../styles/icons/DownloadIcon';
// import UploadIcon from '../../../../styles/icons/UploadIcon';
// import { paymentTypes } from '../../../../constants/paymentTypes';

// const RadioGroup = ({ form }) => {
//   const onChange3 = ({ target: { value } }) => {
//     console.log('radio3 checked', value);
//     form.setFieldsValue({ type: value });
//   };
//   return (

//     <Space style={{display: 'flex', justifyContent: 'space-evenly'}}>
//       <DownloadIconSvg />
//       <Radio.Group buttonStyle="solid" onChange={onChange3} size='large'>
//         <Radio.Button value="credit">{paymentTypes.credit.text}</Radio.Button>
//         <Radio.Button value="debet">{paymentTypes.debet.text}</Radio.Button>
//       </Radio.Group>
//       <UploadIcon />
//     </Space>
//   );
// };

// RadioGroup.propTypes = {
//   form: PropTypes.object.isRequired,
// };

// export default RadioGroup;
