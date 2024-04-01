import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, Col, Row } from 'antd';
import { getCompanyName } from '../../utils/getCompanyName';

const HeaderToPrint = ({ namesType, companysName, title }) => {
  const senderName = getCompanyName(companysName.sender, namesType);
  const recipientName = getCompanyName(companysName.recipient, namesType);

  return (
    <>
      <Row>
        <Col span={11}>
          {companysName.isShowRole && (
            <Typography.Title
              level={5}
              underline
              style={{
                margin: '0 0 10px 0',
              }}
            >
              Постачальник:
            </Typography.Title>
          )}
          <Space direction="vertical">
            {senderName?.map(({ label, name }) =>
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
        <Col span={2}></Col>
        <Col span={11}>
          {companysName.isShowRole && (
            <Typography.Title
              level={5}
              underline
              style={{
                margin: '0 0 10px 0',
              }}
            >
              Отримувач:
            </Typography.Title>
          )}
          <Space direction="vertical">
            {recipientName?.map(({ label, name }) =>
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
          <Typography.Title level={3}>{title}</Typography.Title>
        </Col>
      </Row>
    </>
  );
};

HeaderToPrint.propTypes = {
  namesType: PropTypes.string.isRequired,
  companysName: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default HeaderToPrint;
