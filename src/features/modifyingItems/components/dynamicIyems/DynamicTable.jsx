// import React from 'react';
// import PropTypes from 'prop-types';
// import { Form, Table } from 'antd';
// import { getProductListColumns } from '../../../../pages/InvoiceList/utils/getProductListColumns';
// import EditableTable from '../../../../components/editableTable/EditableTable';

// const DynamicTable = (props) => {
//   const form = Form.useFormInstance();
//   const { name } = props;
//   const dataArray = 'productList';
//   const columns = getProductListColumns(form);

//   const handleSave = (row) => {
//     const dataList = form
//       .getFieldValue(dataArray)
//       .map((item) => (item.key === row.key ? row : item));

//     console.log('handleSave', row, dataList);

//     form.setFieldsValue({
//       [dataArray]: [...dataList],
//     });
//   };

//   const shouldUpdateDataArray = (prevValues, currentValues) => {
//     return prevValues[dataArray] !== currentValues[dataArray];
//   };

//   const shouldUpdatePriceType = (prevValues, currentValues) => {
//     return prevValues.priceType?.value !== currentValues.priceType?.value;
//   };

//   const handleShouldUpdate = (prevValues, currentValues) => {
//     return prevValues.priceType?.value !== currentValues.priceType?.value
//       ? shouldUpdatePriceType(prevValues, currentValues)
//       : shouldUpdateDataArray(prevValues, currentValues);
//   };

//   return (
//     <Form.Item noStyle shouldUpdate={handleShouldUpdate}>
//       {({ getFieldValue }) => {
//         const dataList = getFieldValue(dataArray);

//         return (
//           <Form.Item name={name} noStyle>
//             {dataList?.length ? (
//               <EditableTable
//                 dataSource={dataList}
//                 defaultColumns={columns}
//                 handleSave={handleSave}
//               />
//             ) : (
//               <Table dataSource={[]} columns={columns} />
//             )}
//           </Form.Item>
//         );
//       }}
//     </Form.Item>
//   );
// };

// DynamicTable.propTypes = {
//   name: PropTypes.string.isRequired,
//   dataArray: PropTypes.string.isRequired,
// };

// export default DynamicTable;
