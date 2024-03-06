import { Form, Space } from 'antd';
import DynamicFormItem from './DynamicFormItem';

const renderFormItem = (item) => {
  const { name, component, condition, children } = item;

  if (condition) {
    const { label, ...props } = item;
    return (
      <Form.Item key={name} {...props} noStyle>
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
              <Form.Item key={childElement.name} {...childElement}>
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
