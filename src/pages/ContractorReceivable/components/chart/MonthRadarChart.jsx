import React from 'react';
import PropTypes from 'prop-types';
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { OPERATION_TYPES } from '../../../../constants/operationTypes';


const MonthRadarChart = ({ formattedData, colorsByType }) => {
  console.log('chart3', formattedData, colorsByType);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="month" />
        <PolarRadiusAxis angle={30} domain={[0, formattedData[0].fullMark]} />
        <Radar
          name="Отгружено"
          dataKey={OPERATION_TYPES.DEBET}
          stroke={colorsByType[OPERATION_TYPES.DEBET]}
          fill={colorsByType[OPERATION_TYPES.DEBET]}
          fillOpacity={0.6}
        />
        <Radar
          name="Получено"
          dataKey={OPERATION_TYPES.CREDIT}
          stroke={colorsByType[OPERATION_TYPES.CREDIT]}
          fill={colorsByType[OPERATION_TYPES.CREDIT]}
          fillOpacity={0.6}
        />
        <Radar
          name="Оплачено"
          dataKey={OPERATION_TYPES.PAYMENTS}
          stroke={colorsByType[OPERATION_TYPES.PAYMENTS]}
          fill={colorsByType[OPERATION_TYPES.PAYMENTS]}
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

MonthRadarChart.propTypes = {
  formattedData: PropTypes.arrayOf(PropTypes.object).isRequired,
  colorsByType: PropTypes.object.isRequired,
};

export default MonthRadarChart;
