import { Button, Typography } from 'antd';
import { BUTTON_STYLE, ICON_STYLE } from './style';

const ModalButton = ({ Icon, text }) => (
  <Button style={BUTTON_STYLE}>
    <Icon style={ICON_STYLE} />
    <Typography.Text>{text}</Typography.Text>
  </Button>
);

export default ModalButton;
