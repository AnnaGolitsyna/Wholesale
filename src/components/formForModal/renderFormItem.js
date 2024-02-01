// Change name and delete


// import { Form, Space } from 'antd';
// import DynamicFormItem from './DynamicFormItem';
// import { categoryContractor } from '../../constants/categoryContractor';

// const renderFormItem = (item) => {
//   const {
//     name,
//     label,
//     component,
//     condition,
//     rules,
//     hasFeedback,
//     tooltip,
//     valuePropName,
//     children,
//   } = item;

//  // console.log('renderF', item);
//   if (condition) {
//     return (
//       <DynamicFormItem
//         key={name}
//         shouldUpdateValue={condition}
//         elementProps={item}
//         categoryList={categoryContractor}
//       />
//     );
//   }

//   const hasChildren = children && children.length > 0;

//   return (
//     <Form.Item
//       // {...props}
//       key={name}
//       label={label}
//       name={name}
//       rules={rules}
//       hasFeedback={hasFeedback}
//       tooltip={tooltip}
//       valuePropName={valuePropName}
//     >
//       {hasChildren ? (
//         <Space
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'end',
//           }}
//         >
//           {children.map((childElement) => renderFormItem(childElement))}
//         </Space>
//       ) : (
//         component
//       )}
//     </Form.Item>
//   );
// };

// export default renderFormItem;

//  const {
//    name,
//    label,
//    component,
//    condition,
//    rules,
//    hasFeedback,
//    tooltip,
//    valuePropName,
//    children,
//  } = item;
//  console.log('renderF', item);
//  if (condition) {
//    return (
//      <DynamicFormItem
//        key={name}
//        shouldUpdateValue={condition}
//        element={item}
//        categoryList={categoryContractor}
//      />
//    );
//  }

//  const hasChildren = children && children.length > 0;

//  return (
//    <Form.Item
//      key={name}
//      label={label}
//      name={name}
//      rules={rules}
//      hasFeedback={hasFeedback}
//      tooltip={tooltip}
//      valuePropName={valuePropName}
//    >
//      {hasChildren ? (
//        <Space
//          style={{
//            display: 'flex',
//            justifyContent: 'space-between',
//            alignItems: 'end',
//          }}
//        >
//          {children.map((childElement) => renderFormItem(childElement))}
//        </Space>
//      ) : (
//        component
//      )}
//    </Form.Item>
//  );
