import React from 'react';
//import PropTypes from 'prop-types'
import { Space, Typography, Col, Row } from 'antd';

const HeaderToPrint = ({ title }) => {
  return (
    <>
      <Row>
        <Col span={11}>col-12</Col>
        <Col span={2}></Col>
        <Col span={11}>
          <Space direction="vertical">
            {title?.map(({ label, name }) =>
              !label ? (
                <Typography.Text strong key={name}>
                  {name}
                </Typography.Text>
              ) : (
                <Typography.Text italic key={name}>
                  {`${label}: ${name}`}
                </Typography.Text>
              )
            )}
          </Space>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Typography.Title level={3}>Title</Typography.Title>
        </Col>
      </Row>
    </>
  );
};

//HeaderToPrint.propTypes = {}

export default HeaderToPrint;


