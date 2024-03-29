// Change name and delete


// import React from 'react';
// import PropTypes from 'prop-types';
// import { Form, Select, Typography, Table } from 'antd';
// import { relatedCompaniesColumns } from '../../features/catalog/utils/contractors/getColumns';

// const DynamicFormItem = ({ shouldUpdateValue, elementProps, categoryList }) => {
//   const { name, condition,  label, hasFeedback, rules } = elementProps;

//  // console.log('DF', elementProps);

//   return (
//     <Form.Item
//       key={`${name}${condition}`}
//       noStyle
//       shouldUpdate={(prevValues, currentValues) =>
//         prevValues[shouldUpdateValue] !== currentValues[shouldUpdateValue]
//       }
//     >
//       {({ getFieldValue }) => {
//         if (condition === 'isRelatedCompanies') {
//           const relatedCompaniesList = getFieldValue('relatedCompanies');

//           return (
//             <Form.Item
//               key={`${name}${condition}children`}
//               label={label}
//               name={name}
//               rules={rules}
//               hasFeedback={hasFeedback}
//             >
//               {relatedCompaniesList.length ? (
//                 <Table
//                   dataSource={relatedCompaniesList}
//                   columns={relatedCompaniesColumns}
//                 />
//               ) : (
//                 <Typography.Text code> Связанных компаний нет</Typography.Text>
//               )}
//             </Form.Item>
//           );
//         }

//         if (condition === 'category') {
//           const categoryDetails = categoryList.find(
//             (category) => category.value === getFieldValue(shouldUpdateValue)
//           );
//           const optionsPrices = categoryDetails?.children?.map(
//             ({ label, value }) => ({
//               label,
//               value,
//             })
//           );
//           return (
//             optionsPrices && (
//               <Form.Item
//                 key={`${name}${condition}children`}
//                 label={label}
//                 name={name}
//                 rules={rules}
//                 hasFeedback={hasFeedback}
//               >
//                 <Select
//                   placeholder="выбери категорию цен"
//                   options={optionsPrices}
//                 />
//               </Form.Item>
//             )
//           );
//         }
//       }}
//     </Form.Item>
//   );
// };

// DynamicFormItem.propTypes = {
//   // elementProps: PropTypes.shape({
//   //   name: PropTypes.string.isRequired,
//   //   label: PropTypes.node.isRequired,
//   //   component: PropTypes.func,
//   //   rules: PropTypes.array,
//   //   hasFeedback: PropTypes.bool,
//   //   tooltip: PropTypes.string,
//   //   valuePropName: PropTypes.string,
//   // }).isRequired,
//   // categoryList: PropTypes.arrayOf(
//   //   PropTypes.shape({
//   //     value: PropTypes.any.isRequired,
//   //     children: PropTypes.arrayOf(
//   //       PropTypes.shape({
//   //         label: PropTypes.node.isRequired,
//   //         value: PropTypes.any.isRequired,
//   //       })
//   //     ),
//   //   })
//   // ).isRequired,
// };

// export default DynamicFormItem;
