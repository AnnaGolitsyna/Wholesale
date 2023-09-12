import React from 'react';
import { Typography, Image, Col, Row, DatePicker, Divider } from 'antd';
import ButtonsStyled from '../../../../components/button/ButtonsStyled';
import { brandTheme } from '../../../../styles/brandTheme';
// import PropTypes from 'prop-types'

const HeaderInvoice = (props) => {
  return (
    <>
      <Row>
        <Col span={16}>
          <Typography style={{ textAlign: 'center' }}>
            <Typography.Title level={3} style={{ marginTop: '14px' }}>
              Реализация товара
            </Typography.Title>
          </Typography>
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
          <Divider>Создать новую</Divider>
          <Row justify="space-around" align="middle" gutter={[16, 24]}>
            <Col span={7}>
              <ButtonsStyled text="Накладную" type="primary" />
            </Col>
            <Col span={7}>
              <ButtonsStyled text="Товар" />
            </Col>
            <Col span={7}>
              <ButtonsStyled text="Клиента" />
            </Col>
          </Row>
        </Col>

        <Col span={8}>
          <Image
            height="235px"
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
