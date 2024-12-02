import React from 'react';
import PropTypes from 'prop-types';
import { Table, Typography } from 'antd';
import { shadowStyle } from './shadowStyle';
import { formattedPriceToString } from '../../../../utils/priceUtils';
import {OPERATION_TYPES} from '../../../../constants/operationTypes';

const { Text } = Typography;

const SummaryRow = ({ data, balanceEnd }) => {
  const [totalDebet, totalCredit] = data.reduce(
    (acc, { type, sum }) => {
      return type === OPERATION_TYPES.DEBET
        ? [acc[0] + sum, acc[1]]
        : [acc[0], acc[1] + sum];
    },
    [0, 0]
  );

  return (
    <>
      <Table.Summary.Row>
        <Table.Summary.Cell />
        <Table.Summary.Cell />
        <Table.Summary.Cell />
        <Table.Summary.Cell />
        <Table.Summary.Cell index={4}>ВСЬОГО:</Table.Summary.Cell>
        <Table.Summary.Cell index={5} align="center">
          <Text style={shadowStyle}>{formattedPriceToString(totalDebet)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={6} align="center">
          <Text style={shadowStyle}>{formattedPriceToString(totalCredit)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={7} align="center">
          <Text style={shadowStyle}>{balanceEnd}</Text>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </>
  );
};

SummaryRow.propTypes = {
  data: PropTypes.array.isRequired,
  balanceEnd: PropTypes.string.isRequired,
};

export default SummaryRow;
