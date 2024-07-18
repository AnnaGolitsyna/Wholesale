import React from 'react'
import PropTypes from 'prop-types'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { data01 } from './pieChartData'

const OnePieChart = props => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

OnePieChart.propTypes = {}

export default OnePieChart