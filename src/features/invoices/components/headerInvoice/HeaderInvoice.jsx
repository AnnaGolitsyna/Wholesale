import React from 'react';
import { Typography, Image, Col, Row, DatePicker, Divider, Button } from 'antd';
import ButtonsStyled from '../../../../components/button/ButtonsStyled';
import { brandTheme } from '../../../../styles/brandTheme';
// import PropTypes from 'prop-types'

const HeaderInvoice = (props) => {
  return (
    <>
      <Row>
        <Col span={19}>
          <Row justify="space-around" align="middle">
            <Col>
              <Typography>
                <Typography.Title level={3} style={{ marginTop: '14px' }}>
                  Реализация товара
                </Typography.Title>
              </Typography>
            </Col>
            <Col>
              <Button className="button" type="primary" block>
                Создать накладную
              </Button>
            </Col>
          </Row>

          <Row justify="space-around" align="middle">
            <Col span={11} style={{ textAlign: 'center' }}>
              <Divider>За месяц</Divider>
              <DatePicker size="middle" picker="month" />
            </Col>
            <Col span={11}>
              <Divider>За период</Divider>
              <DatePicker.RangePicker size="middle" />
            </Col>
          </Row>
        </Col>

        <Col span={5}>
          <Image
            height="155px"
            src="/clients.svg"
            preview={false}
            style={{ backgroundColor: brandTheme.token.colorPrimary }}
          />
        </Col>
      </Row>

      <Divider />
    </>
  );
};

// HeaderInvoice.propTypes = {}

export default HeaderInvoice;
