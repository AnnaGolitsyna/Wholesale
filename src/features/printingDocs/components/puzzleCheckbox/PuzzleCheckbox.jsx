import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Space, Typography } from 'antd';
import PuzzleIcon from '../../../../styles/icons/PuzzleIcon';

const PuzzleCheckbox = ({ options, checkedValues, onChange }) => {
  console.log('PuzzleCheckbox', options, checkedValues, onChange);
  return (
    <Space direction="vertical">
      <Space>
        <PuzzleIcon />
        <Typography.Text strong>Выберите поля:</Typography.Text>
      </Space>
      <Checkbox.Group
        options={options}
        defaultValue={checkedValues}
        onChange={onChange}
      />
    </Space>
  );
};

PuzzleCheckbox.propTypes = {
  options: PropTypes.array.isRequired,
  checkedValues: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PuzzleCheckbox;
