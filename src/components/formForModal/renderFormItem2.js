import { Form, Space } from 'antd';
import DynamicFormItem2 from './DynamicFormItem2';

const renderFormItem2 = (item) => {
  const { name, component, condition, children } = item;

  if (condition) {
    const { label, ...props } = item;
    return (
      <Form.Item key={name} {...props}>
        <DynamicFormItem2 condition={condition} />
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
            alignItems: 'end',
          }}
        >
          {children.map((childElement) => {
            return (
              <Form.Item key={childElement.name} {...childElement}>
                {renderFormItem2(childElement)}
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

export default renderFormItem2;
