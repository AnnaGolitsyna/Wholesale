import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Typography } from 'antd';
import { findIsDateInRange } from '../../utils/findIsDateInRange';
import { getShortDateFormat } from '../../utils/dateUtils';

const TagForNewDate = ({ date, color }) => {

  if (!date) return null;
  const formattedDate = getShortDateFormat(date);

  return (
    <>
      {findIsDateInRange(formattedDate, 17) ? (
        <Tag color={color || null}>{formattedDate}</Tag>
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


