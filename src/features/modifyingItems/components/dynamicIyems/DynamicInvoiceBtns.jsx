// import React from 'react';
// import PropTypes from 'prop-types';
// import { Form, Button, Space, Alert } from 'antd';
// import { AddOnModal } from '../modals/AddOnModal';
// import { ModalToPrint } from '../../../printingDocs';
// import { v4 as uuidv4 } from 'uuid';

// const DynamicInvoiceBtns = (props) => {
//   const form = Form.useFormInstance();
//   const handleLocStor = () => {
//     const prodList = JSON.parse(localStorage.getItem('productList'));
//     const prevProductList = form.getFieldValue('productList') || [];
//     const typePrice = form.getFieldValue('priceType').value || 'retail';
//     const newProductList = prodList?.map((product) => {

//       return {
//         ...product,
//         selectedPrice: product[typePrice],
//         key: uuidv4(),
//       };
//     });
//     // form.setFieldsValue({ ...data????????????????, productList: newProductList });
//     form.setFieldsValue({
//       productList: [...prevProductList, ...newProductList],
//     });
//   };
//   return (
//     <Form.Item
//       noStyle
//       shouldUpdate={(prevValues, currentValues) => !prevValues.name}
//     >
//       {({ getFieldValue }) => {
//         return getFieldValue('name') ? (
//           <Space>
//             <AddOnModal data={null} typeData="Invoice" actionType="create" />

//             <Button onClick={handleLocStor}>Скопировать из шаблона</Button>
//             <AddOnModal data={null} typeData="InvoiceEmpty" actionType="create" />

//             <ModalToPrint data={[]} type="priceList" />
//           </Space>
//         ) : (
//           <Alert
//             description="Добавить товары можно после заполнения полей со звездочкой"
//             type="info"
//             showIcon
//           />
//         );
//       }}
//     </Form.Item>
//   );
// };

// DynamicInvoiceBtns.propTypes = {};

// export default DynamicInvoiceBtns;
