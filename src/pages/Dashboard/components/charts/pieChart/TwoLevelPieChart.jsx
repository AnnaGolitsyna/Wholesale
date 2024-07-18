import React from 'react'
import PropTypes from 'prop-types'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { data01, data02 } from './pieChartData'

const TwoLevelPieChart = props => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data01}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
        />
        <Pie
          data={data02}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

TwoLevelPieChart.propTypes = {}

export default TwoLevelPieChart