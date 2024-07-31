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
import CustomTooltip from '../../../../../components/chart/CustomTooltip';
import CustomizedAxisTick from './CustomizedAxisTick';

const ReceivablesChart = ({ formattedData, type }) => {
  const { primaryColor, secondaryColor } = useOperationColors(type);

  // const CustomizedAxisTick = (props) => {
  //   const { x, y, payload } = props;
  //   return (
  //     <g transform={`translate(${x},${y})`}>
  //       <text
  //         x={0}
  //         y={0}
  //         dy={16}
  //         textAnchor="end"
  //         fill={primaryColor}
  //         transform="rotate(-35)"
  //       >
  //         {payload.value}
  //       </text>
  //     </g>
  //   );
  // };

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
        <XAxis dataKey="name" tick={<CustomizedAxisTick color={primaryColor} />} />
        <YAxis tick={{ stroke: primaryColor, strokeWidth: 0.2 }} />
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
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
