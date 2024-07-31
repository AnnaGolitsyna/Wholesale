import React from 'react'
import PropTypes from 'prop-types'

  const CustomizedAxisTick = ({ color, ...props }) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill={color}
          transform="rotate(-20)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

CustomizedAxisTick.propTypes = {
  color: PropTypes.string,
  payload: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default CustomizedAxisTick