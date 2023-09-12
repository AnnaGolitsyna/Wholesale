import React from 'react';
import {
  Typography,
  Image,
  Col,
  Row,
  DatePicker,
  Space,
  Divider,
 
} from 'antd';
import ButtonsStyled from '../components/button/ButtonsStyled';
import { brandTheme } from '../styles/brandTheme';

const Clients = () => {
  return (
    <>
      <Row>
        <Col span={16}>
          <Typography style={{ textAlign: 'center' }}>
            <Typography.Title level={3}>Расходные накладные</Typography.Title>
          </Typography>
          <Divider>За месяц</Divider>
          <Space>
            {/* <Typography.Text>За месяц</Typography.Text> */}
            <DatePicker size="large" picker="month" />
          </Space>
          <Divider>За период</Divider>
          <Space>
            {/* <Typography.Text>За период</Typography.Text> */}
            <DatePicker.RangePicker size="large" />
          </Space>
        </Col>
        <Col span={8}>
          <Image
            height="100%"
            src="/clients.svg"
            preview={false}
            style={{ backgroundColor: brandTheme.token.colorPrimary }}
          />
        </Col>
      </Row>
      <Divider />
      <Row justify="end">
        <Space>
          <ButtonsStyled text="Новая накладная" type="primary" />
          <ButtonsStyled text="Новый товар" />

        </Space>
      </Row>
    </>
  );
};

export default Clients;

// style={{ color: brandTheme.token.colorPrimary }}
