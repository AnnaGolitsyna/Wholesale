import React from 'react';
import PropTypes from 'prop-types';
import { Card, theme } from 'antd';
import { getFullFormattedDate } from '../../utils/dateUtils';

const CustomTooltip = ({ active, payload, label }) => {
  const { token } = theme.useToken();
  if (active && payload && payload.length) {
    const isDateFormat = (label) => /^\d{4}-\d{2}$/.test(label);

    const formattedLabel = (label) => {
      return isDateFormat(label) ? getFullFormattedDate(label) : label;
    };

    return (
      <Card
        title={formattedLabel(label)}
        style={{ backgroundColor: token.clolrNotificationBg }}
      >
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${(entry.value).toFixed(2)}`}
          </p>
        ))}
      </Card>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
};

export default CustomTooltip;
