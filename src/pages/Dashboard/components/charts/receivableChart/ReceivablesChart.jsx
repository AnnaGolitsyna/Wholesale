import React from 'react';
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
  ComposedChart,
} from 'recharts';
import { useOperationColors } from '../../../hook/useOperationColors';
import CustomTooltip from '../../../../../components/chart/tooltip/CustomTooltip';
import CustomizedAxisTick from './CustomizedAxisTick';

const ReceivablesChart = ({ formattedData, type }) => {
  const { primaryColor, secondaryColor } = useOperationColors(type);


  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <ComposedChart
        data={formattedData}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={<CustomizedAxisTick color={primaryColor} />}
        />
        <YAxis tick={{ stroke: primaryColor, strokeWidth: 0.2 }} />
        <Tooltip content={<CustomTooltip />} />

        <Bar
          dataKey="receivable"
          name={'Долг'}
          fill={primaryColor}
          activeBar={<Rectangle fill={secondaryColor} stroke="blue" />}
        />
        <Line type="monotone" dataKey="count" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ReceivablesChart;
