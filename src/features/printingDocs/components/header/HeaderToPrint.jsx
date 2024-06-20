import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, Col, Row } from 'antd';
import { getCompanyName } from '../../utils/getCompanyName';
import NameFields from '../nameFields/NameFields';
import { useGetContractorByIdQuery } from '../../../../pages/Contractors';

const HeaderToPrint = ({ namesType, companysName, title, contractor }) => {
  const { data, error } = useGetContractorByIdQuery(contractor?.value);

  const {sender, recipient, isShowRole } = companysName;

  console.log('test', namesType, companysName, title, contractor);

 // console.log('names', companysName, contractor, data, sender, recipient);

  const senderName = getCompanyName(sender ?? data, namesType);
  const recipientName = getCompanyName(recipient ?? data, namesType);

  return (
    <>
      <Row>
        <Col span={11}>
          {isShowRole && (
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
                <Typography.Text strong key={`${name}${label}`}>
                  {name}
                </Typography.Text>
              ) : (
                <Typography.Text italic key={`${name}${label}`}>
                  {`${label}: ${name}`}
                </Typography.Text>
              )
            )}
          </Space>
          {/* <NameFields nameList={senderName} /> */}
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          {isShowRole && (
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
                <Typography.Text strong key={`${name}${label}`}>
                  {name}
                </Typography.Text>
              ) : (
                <Typography.Text italic key={`${name}${label}`}>
                  {`${label}: ${name}`}
                </Typography.Text>
              )
            )}
          </Space>
          {/* <NameFields nameList={recipientName} /> */}
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
