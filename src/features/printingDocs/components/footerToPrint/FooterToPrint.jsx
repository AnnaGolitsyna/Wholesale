import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Col, Row } from 'antd';
import { formattedPriceToString } from '../../../../utils/priceUtils';
import { myCompanysData } from '../../../../constants/companysData';

const FooterToPrint = ({ companysName, sum }) => {
  const renderCompanySignature = (role, company) => (
    <Typography.Text strong>
      {`${role}: ____________________${
        company?.taxNumber === myCompanysData.taxNumber
          ? company.name
          : '(____________________)'
      }`}
    </Typography.Text>
  );

  return (
    <>
      {sum && (
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Typography.Title level={5}>
              {`Всього: ${formattedPriceToString(sum)} грн.`}
            </Typography.Title>
          </Col>
        </Row>
      )}

      <Row style={{ marginTop: '50px' }}>
        <Col span={11}>
          {renderCompanySignature('Відправив', companysName?.sender)}
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          {renderCompanySignature('Отримав', companysName?.recipient)}
        </Col>
      </Row>
    </>
  );
};

FooterToPrint.propTypes = {
  sum: PropTypes.number,
  companysName: PropTypes.shape({
    sender: PropTypes.shape({
      name: PropTypes.string,
      taxNumber: PropTypes.string,
    }),
    recipient: PropTypes.shape({
      name: PropTypes.string,
      taxNumber: PropTypes.string,
    }),
  }).isRequired,
};

export default FooterToPrint;
