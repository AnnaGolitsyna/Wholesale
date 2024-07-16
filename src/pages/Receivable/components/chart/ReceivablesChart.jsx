import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ReceivablesChart = ({ formattedData }) => {
  // Filter out entries with null receivables and sort by receivable amount
  const chartData = formattedData
    .filter((item) => item.receivable !== null)
    .sort((a, b) => b.receivable - a.receivable)
    .slice(0, 10); // Take top 10 for better readability

  console.log('Chart data:', chartData); // Debug: Log chart data

  if (chartData.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  return (
    <div className="w-full h-96 border border-gray-300 p-4">
      <h2 className="text-xl font-bold mb-4">Top 10 Receivables</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
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
            <Bar dataKey="receivable" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div>
          Chart should render here. If you see this, there might be an issue
          with the chart library or data.
        </div>
      )}
    </div>
  );
};

export default ReceivablesChart;
