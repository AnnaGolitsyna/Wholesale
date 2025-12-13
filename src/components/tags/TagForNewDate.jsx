import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Typography, theme } from 'antd';
import { findIsDateInRange } from '../../utils/findIsDateInRange';
import { getShortDateFormat } from '../../utils/dateUtils';

const TagForNewDate = ({ date, color }) => {
  const { token } = theme.useToken();

  if (!date) return null;
  const formattedDate = getShortDateFormat(date);
  const tagColor = color || token.dateAccentColor;

  return (
    <>
      {findIsDateInRange(formattedDate, 17) ? (
        <Tag color={tagColor}>{formattedDate}</Tag>
      ) : (
        <Typography.Text style={{ fontSize: 13 }}>
          {formattedDate}
        </Typography.Text>
      )}
    </>
  );
};

TagForNewDate.propTypes = {
  date: PropTypes.string,
  color: PropTypes.string,
};

export default TagForNewDate;


