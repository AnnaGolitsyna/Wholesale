import React from 'react';
import PropTypes from 'prop-types';
import { Table, Space, Typography } from 'antd';
import { shadowStyle } from './shadowStyle';

const { Text } = Typography;

const SummaryRow = ({ data, balanceEnd }) => {
  let totalDebet = 0;
  let totalCredit = 0;
  data.forEach(({ type, sum }) => {
    if (type === 'debet') {
      totalDebet += sum;
    } else if (type === 'credit') {
      totalCredit += sum;
    }
  });
  return (
    <>
      <Table.Summary.Row>
        <Table.Summary.Cell />
        <Table.Summary.Cell />
        <Table.Summary.Cell index={3}>Обороты за период:</Table.Summary.Cell>
        <Table.Summary.Cell />
        <Table.Summary.Cell index={4} align="center">
          <Text style={shadowStyle}>{totalDebet.toFixed(2)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={5} align="center">
          <Text style={shadowStyle}>{totalCredit.toFixed(2)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={6} align="center">
          <Text style={shadowStyle}>{balanceEnd.toFixed(2)}</Text>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </>
  );
};

SummaryRow.propTypes = {};

export default SummaryRow;
