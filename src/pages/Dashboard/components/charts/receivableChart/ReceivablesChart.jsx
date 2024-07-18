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


const ReceivablesChart = ({ formattedData }) => {

  const chartData = formattedData
    .filter((item) => item.receivable !== null)
    .sort((a, b) => b.receivable - a.receivable)
    .slice(0, 10); // Take top 10 for better readability

 // console.log('Chart data:', chartData); // Debug: Log chart data


  return (
    <ResponsiveContainer width={'100%'} height={300}>
      <ComposedChart
        width={500}
        height={300}
        data={chartData}
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
        <Tooltip />
        <Legend />
        <Bar
          dataKey="receivable"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Line type="monotone" dataKey="count" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ReceivablesChart;
