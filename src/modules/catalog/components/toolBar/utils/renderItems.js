import { Space } from 'antd';
export const renderItems = (list) =>
  list.map(({ name, direction, children, component }) => (
    <Space key={name} direction={direction || 'horizontal'}>
      {children ? renderItems(children) : component}
    </Space>
  ));
