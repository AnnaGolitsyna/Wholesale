import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm, Tooltip } from 'antd';
import { DeleteRowOutlined } from '@ant-design/icons';

const ConfirmDeletionIcon = ({ handleClick }) => {

  const confirm = () => {
    handleClick();
  };

  return (
    <Popconfirm
      title="Удаление"
      description="Вы действительно ходите удалить эту строку?"
      okText="Удалить"
      cancelText="Закрыть"
      onConfirm={confirm}
      placement="left"

    >
      <Tooltip title="Удалить">
        <DeleteRowOutlined />
      </Tooltip>
    </Popconfirm>
  );
};

ConfirmDeletionIcon.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ConfirmDeletionIcon;
