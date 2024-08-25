import React from 'react';
import PropTypes from 'prop-types';
import { theme } from 'antd';
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from 'recharts';
import CustomTooltip from '../../../../components/chart/tooltip/CustomTooltip';
import { OPERATION_TYPES } from '../../../../constants/operationTypes';
import {LABEL_CHARTS_LEGEND} from '../../constants/labelChartsLegend';

const TransactionAreaChart = ({ formattedData, colorsByType }) => {
  const { token } = theme.useToken();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={730}
        height={250}
        data={formattedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorDebet" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={colorsByType[OPERATION_TYPES.DEBET]}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={colorsByType[OPERATION_TYPES.DEBET]}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="colorCredit" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={colorsByType[OPERATION_TYPES.CREDIT]}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={colorsByType[OPERATION_TYPES.CREDIT]}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="month"
          tick={{
            stroke: token.colorInfo,
            strokeWidth: 1,
          }}
        />
        <YAxis
          tick={{
            stroke: token.colorInfo,
            strokeWidth: 0.5,
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey={OPERATION_TYPES.DEBET}
          name={LABEL_CHARTS_LEGEND[OPERATION_TYPES.DEBET]}
          stroke={colorsByType[OPERATION_TYPES.DEBET]}
          fillOpacity={1}
          fill="url(#colorDebet)"
        />
        <Area
          type="monotone"
          dataKey={OPERATION_TYPES.CREDIT}
          name={LABEL_CHARTS_LEGEND[OPERATION_TYPES.CREDIT]}
          stroke={colorsByType[OPERATION_TYPES.CREDIT]}
          fillOpacity={1}
          fill="url(#colorCredit)"
        />
        <Line
          type="monotone"
          dataKey={OPERATION_TYPES.PAYMENTS}
          name={LABEL_CHARTS_LEGEND[OPERATION_TYPES.PAYMENTS]}
          stroke={colorsByType[OPERATION_TYPES.PAYMENTS]}
          strokeWidth={3}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

TransactionAreaChart.propTypes = {
  formattedData: PropTypes.arrayOf(PropTypes.object).isRequired,
  colorsByType: PropTypes.object.isRequired,
};

export default TransactionAreaChart;
