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

import ImageInvoice from '../imageInvoice/ImageInvoice';
// import PropTypes from 'prop-types'

const HeaderInvoice = ({ data }) => {
  const { color, title, imgSrc } = data;

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorTextBase: color,
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

// HeaderInvoice.propTypes = {}

export default HeaderInvoice;
