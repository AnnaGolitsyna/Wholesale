import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Space, Typography } from 'antd';
import { ReactComponent as PazzleToolIcon } from '../../../../styles/icons/pazzle/PazzleToolIcon.svg';

const PuzzleCheckbox = ({ options, checkedValues, onChange }) => {
  return (
    <Space direction="vertical">
      <Space>
        <PazzleToolIcon />
        <Typography.Text strong>Выберите поля:</Typography.Text>
      </Space>
      <Checkbox.Group
        options={options}
        value={checkedValues}
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
