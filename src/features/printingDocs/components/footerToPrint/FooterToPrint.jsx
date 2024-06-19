import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, Col, Row, Divider } from 'antd';
import {
  formattedPrice,
  formattedPriceToString,
} from '../../../../utils/priceUtils';

const FooterToPrint = ({ sum, companysName }) => {
  console.log('sum', sum, companysName);
  return (
    <>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Typography.Title level={3}>
            {`Всього: ${formattedPriceToString(sum)} грн.`}
          </Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Typography.Text strong>
            {` Відправив: ____________________${
              companysName?.sender?.taxNumber === '2624412068'
                ? companysName?.sender.name
                : '(____________________)'
            }`}
          </Typography.Text>
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          <Typography.Text strong>
            {` Отримав: ____________________${
              companysName?.recipient?.taxNumber === '2624412068'
                ? companysName?.recipient.name
                : '(____________________)'
            }`}
          </Typography.Text>
        </Col>
      </Row>
    </>
  );
};

FooterToPrint.propTypes = {};

export default FooterToPrint;
