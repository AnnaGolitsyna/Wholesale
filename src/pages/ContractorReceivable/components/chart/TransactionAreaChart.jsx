import React from 'react';
import PropTypes from 'prop-types';
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
import { theme } from 'antd';
import CustomTooltip from '../../../../components/chart/CustomTooltip';

const TransactionAreaChart = ({ data }) => {
  const { token } = theme.useToken();
  const colors = {
    primary: token.primaryColorChartAreaBg,
    secondary: token.secondaryColorChartAreaBg,
    acsentColor: token.acsentChartColor,
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorDebet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors.secondary} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCredit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="debet"
          name="Отгружено"
          stroke={colors.secondary}
          fillOpacity={1}
          fill="url(#colorDebet)"
        />
        <Area
          type="monotone"
          dataKey="credit"
          name="Получено"
          stroke={colors.primary}
          fillOpacity={1}
          fill="url(#colorCredit)"
        />
        <Line
          type="monotone"
          dataKey="payments"
          name="Оплата"
          stroke={colors.acsentColor}
          strokeWidth={3}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

TransactionAreaChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TransactionAreaChart;
