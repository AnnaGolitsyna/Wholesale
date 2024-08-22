import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { summarizeExcludingFields } from '../../utils/summarizeExcludingFields';
import { LABEL_CHARTS_LEGEND } from '../../constants/labelChartsLegend';

const TypeSharePieChart = ({ formattedData, colorsByType }) => {
  const fieldsToExclude = ['month', 'fullMark'];
  const data = summarizeExcludingFields(formattedData, fieldsToExclude);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color }}>{LABEL_CHARTS_LEGEND[value]}</span>;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorsByType[entry.name]} />
          ))}
        </Pie>

        <Legend formatter={renderColorfulLegendText} />
      </PieChart>
    </ResponsiveContainer>
  );
};

TypeSharePieChart.propTypes = {
  formattedData: PropTypes.arrayOf(PropTypes.object).isRequired,
  colorsByType: PropTypes.object.isRequired,
};

export default TypeSharePieChart;
