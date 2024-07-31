import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, ResponsiveContainer, Sector, Cell } from 'recharts';
import { useOperationColors } from '../../../hook/useOperationColors';
import { OPERATION_TYPES } from '../../../../../constants/operationTypes';

const PieReceivableChart = ({ formattedData, type }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { primaryColor, secondaryColor } = useOperationColors(type);

  const data = useMemo(() => {
    return type === OPERATION_TYPES.CREDIT
      ? formattedData.map((item) => ({
          ...item,
          receivable: Math.abs(item.receivable),
        }))
      : formattedData;
  }, [formattedData, type]);

  const maxReceivable = useMemo(() => {
    return Math.max(...data.map((item) => item.receivable)).toFixed(2);
  }, [data]);

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={secondaryColor}>
          <tspan x="50%" dy="-0.5em">
            {payload.name}
          </tspan>
          <tspan x="50%" dy="1.5em">
            {value.toFixed(2)}
          </tspan>
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={secondaryColor}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={secondaryColor}
        />

        <text
          x={ex + (cos >= 0 ? -25 : 5)}
          y={ey}
          dy={'0.5em'}
          textAnchor="start"
          fill={secondaryColor}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  };

  const renderDefaultLabel = () => (
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      fill={primaryColor}
    >
      <tspan x="50%" dy="-0.5em">
        макс.долг
      </tspan>
      <tspan x="50%" dy="1.5em">
        {maxReceivable}
      </tspan>
    </text>
  );

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ResponsiveContainer width={'110%'} height={'110%'}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          dataKey="receivable"
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={primaryColor} />
          ))}
        </Pie>
        {activeIndex === null && renderDefaultLabel()}
      </PieChart>
    </ResponsiveContainer>
  );
};

PieReceivableChart.propTypes = {
  formattedData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      receivable: PropTypes.number.isRequired,
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
};

export default PieReceivableChart;
