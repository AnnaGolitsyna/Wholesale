import { Form, Space } from 'antd';
import DynamicFormItem from './DynamicFormItem';
import FormItemComponent from './FormItemComponent';

const renderFormItem = (item) => {
  const { keyname, component, condition, children } = item;


  const hasChildren = children && children.length > 0;

  if (hasChildren) {
    return (
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
        }}
      >
        {children.map((childElement) => {
         // console.log('childElement', childElement, childElement.children);
          return (
            <Form.Item

              key={childElement.keyname}
              {...childElement}
            >
              {renderFormItem(childElement)}
            </Form.Item>
          );
        })}
      </Space>
    );
  } else {
    return <FormItemComponent {...item} />;
  }

};

export default renderFormItem;
// if (condition) {
//   const { label, ...props } = item;
//   return (
//     //  <Form.Item key={keyname} {...props} noStyle>
//     <Form.Item {...props} noStyle>
//       <DynamicFormItem {...props} />
//     </Form.Item>
//   );
// }

// const hasChildren = children && children.length > 0;

// return (
//   <>
//     {hasChildren ? (
//       <Space
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'stretch',
//         }}
//       >
//         {children.map((childElement) => {
//           return (
//             <Form.Item key={childElement.keyname} {...childElement}>
//               {renderFormItem(childElement)}
//             </Form.Item>
//           );
//         })}
//       </Space>
//     ) : (
//       component
//     )}
//   </>
// );
