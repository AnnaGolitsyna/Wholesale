import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Col, Row } from 'antd';
import NameFields from '../nameFields/NameFields';
import { getCompanyName } from '../../utils/getCompanyName';
import { splitAdditionalId } from '../../../../utils/splitAdditionalId';
import { useGetContractorByIdQuery } from '../../../../pages/Contractors';

const InvoiceHeader = ({ namesType, companysName, title, contractor }) => {
  const { data: contractorData, error } = useGetContractorByIdQuery(
    splitAdditionalId(contractor.value)
  );

   if (error) {
     throw new Error('Error fetching contractor data');
   }

  const { sender, recipient, isShowRole } = companysName;

  const senderName = getCompanyName(
    sender ?? contractorData,
    namesType,
    contractor.value
  );
  const recipientName = getCompanyName(
    recipient ?? contractorData,
    namesType,
    contractor.value
  );

  const renderCompanyName = (title, nameList) => (
    <Col span={11}>
      {isShowRole && (
        <Typography.Title level={5} underline style={{ margin: '0 0 10px 0' }}>
          {title}
        </Typography.Title>
      )}
      <NameFields nameList={nameList} />
    </Col>
  );

  return (
    <>
      <Row>
        {renderCompanyName('Постачальник:', senderName)}
        <Col span={2}></Col>
        {renderCompanyName('Отримувач:', recipientName)}
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Typography.Title level={3}>{title}</Typography.Title>
        </Col>
      </Row>
    </>
  );
};

InvoiceHeader.propTypes = {
  namesType: PropTypes.string.isRequired,
  companysName: PropTypes.shape({
    sender: PropTypes.object,
    recipient: PropTypes.object,
    isShowRole: PropTypes.bool,
  }).isRequired,
  title: PropTypes.string.isRequired,
  contractor: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default InvoiceHeader;

