// import React from 'react';
// import PropTypes from 'prop-types';
// import { Form } from 'antd';
// import DynamicSelectOfCategoryPrice from '../../features/catalog/components/dynamicFormItems/DynamicSelectOfCategoryPrice';
// import DynamicTableOfRelatedCompanies from '../../features/catalog/components/dynamicFormItems/DynamicTableOfRelatedCompanies';

// const DynamicFormItem = (props) => {
//   const { condition } = props;

//   const formsFieldsObject = {
//     category: <DynamicSelectOfCategoryPrice {...props} />,
//     isRelatedCompanies: <DynamicTableOfRelatedCompanies {...props} />,
//   };

//   const formsField = formsFieldsObject[condition];

//   return (
//     <Form.Item
//       noStyle
//       shouldUpdate={(prevValues, currentValues) =>
//         prevValues[condition] !== currentValues[condition]
//       }
//     >
//       {formsField}
//     </Form.Item>
//   );
// };

// DynamicFormItem.propTypes = {
//   condition: PropTypes.string.isRequired,
// };

// export default DynamicFormItem;
