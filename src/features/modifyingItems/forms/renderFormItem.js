import { Form, Space } from 'antd';
import DynamicFormItem from './DynamicFormItem';

const renderFormItem = (item) => {
  const { keyname, component, condition, children } = item;

  //console.log('renderFormItem', item, keyname);

  if (condition) {
    const { label, ...props } = item;
    return (
      <Form.Item key={keyname} {...props} noStyle>
        <DynamicFormItem {...props} />
      </Form.Item>
    );
  }

  const hasChildren = children && children.length > 0;

  return (
    <>
      {hasChildren ? (
        <Space
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}
        >
          {children.map((childElement) => {
            return (
              <Form.Item key={childElement.keyname} {...childElement}>
                {renderFormItem(childElement)}
              </Form.Item>
            );
          })}
        </Space>
      ) : (
        component
      )}
    </>
  );
};

export default renderFormItem;
