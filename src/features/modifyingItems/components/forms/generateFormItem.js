import { Form } from 'antd';
import FormItemComponent from './FormItemComponent';

const generateFormItem = (props) => (
  <Form.Item key={props.keyname} {...props}>
    <FormItemComponent {...props} />
  </Form.Item>
);

export { generateFormItem };
