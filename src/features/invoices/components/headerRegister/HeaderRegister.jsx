import React from 'react';
import {
  Typography,
  Col,
  Row,
  DatePicker,
  Divider,
  Button,
  ConfigProvider,
} from 'antd';
import { theme } from 'antd';
import ImageInvoice from '../imageInvoice/ImageInvoice';
import PropTypes from 'prop-types';

const { useToken } = theme;

const HeaderRegister = ({ data, type }) => {
  const { token } = useToken();
  const { color, title, imgSrc } = data;

  console.log(color, title, imgSrc);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorTextBase: color,
          },
          components: {
            Button: {
              colorPrimary: type === 'debet' ? color : token.colorSecondaryBtn,
            },
          },
        }}
      >
        <Row>
          <Col span={19}>
            <Row justify="space-around" align="middle">
              <Col>
                <Typography>
                  <Typography.Title
                    level={3}
                    style={{
                      marginTop: '14px',
                    }}
                  >
                    {title}
                  </Typography.Title>
                </Typography>
              </Col>
              <Col>
                <Button className="active" type="primary" block>
                  Создать накладную
                </Button>
              </Col>
            </Row>

            <Row justify="space-around" align="middle">
              <Col span={11} style={{ textAlign: 'center' }}>
                <Divider>За месяц</Divider>
                <DatePicker className="active" size="middle" picker="month" />
              </Col>
              <Col span={11} style={{ textAlign: 'center' }}>
                <Divider>За период</Divider>
                <DatePicker.RangePicker className="active" size="middle" />
              </Col>
            </Row>
          </Col>

          <Col span={5}>
            <ImageInvoice src={imgSrc} color={color} />
          </Col>
        </Row>

        <Divider />
      </ConfigProvider>
    </>
  );
};

HeaderRegister.propTypes = {
  data: {
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
  }.isRequired,
  type: PropTypes.string.isRequired,
};

export default HeaderRegister;
