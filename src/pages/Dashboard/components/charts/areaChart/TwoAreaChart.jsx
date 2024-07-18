import React from 'react'
import PropTypes from 'prop-types'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from 'recharts';
import {data} from './areaChartData'

const TwoAreaChart = props => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Area
          type="monotone"
          dataKey="amt"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

TwoAreaChart.propTypes = {}

export default TwoAreaChart