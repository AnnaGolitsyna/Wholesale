import React from 'react';
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Rectangle,
  ComposedChart,
} from 'recharts';
import { useOperationColors } from '../../../hook/useOperationColors';
import CustomTooltip from '../../../../../components/chart/CustomTooltip';

const ReceivablesChart = ({ formattedData, type }) => {
  const { primaryColor, secondaryColor } = useOperationColors(type);

  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <ComposedChart
        width={500}
        height={300}
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
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
