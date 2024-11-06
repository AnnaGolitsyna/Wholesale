import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Typography, Flex } from 'antd';
import { TransactionsTable } from '../../../../pages/ContractorReceivable';
import FooterToPrint from '../footerToPrint/FooterToPrint';

const ReceivableContent = ({
  companysName,
  title,
  isDuble,
  data: { name, ...data },
  columns,
  ...props
}) => {

console.log('data', props, columns);

  const renderReceivable = () => (
    <>
      {/* <InvoiceHeader
        namesType={namesType}
        companysName={companysName}
        title={title}
        contractor={name}
      /> */}
      <Flex vertical>
        <Typography.Title level={4} style={{ textAlign: 'center', margin: 0 }}>
          {title}
        </Typography.Title>
        <Typography.Title level={5} style={{ textAlign: 'center', margin: 0 }}>
          {/* {companysName?.fullName} */}
          {`між ${companysName?.sender?.name} та ${name}`}
        </Typography.Title>

      </Flex>
      <TransactionsTable columns={columns} />
      <FooterToPrint companysName={companysName} />
    </>
  );

  return (
    <>
      {renderReceivable()}
      {isDuble && (
        <>
          <Divider />
          {renderReceivable()}
        </>
      )}
    </>
  );
};

ReceivableContent.propTypes = {};

export default ReceivableContent;
