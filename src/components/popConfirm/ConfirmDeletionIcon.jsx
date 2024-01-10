import React from 'react';
import { Popconfirm, Tooltip } from 'antd';
import { DeleteRowOutlined } from '@ant-design/icons';
//import PropTypes from 'prop-types'

const ConfirmDeletionIcon = ({ handleClick }) => {
  const confirm = (e) => {
    console.log('pop', e);
    // message.success('Click on Yes');
    handleClick();
  };
  const cancel = (e) => {
    console.log(e);
    //message.error('Click on No');
  };
  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      okText="Yes"
      cancelText="No"
      onConfirm={confirm}
      onCancel={cancel}
    >
      <Tooltip title="Удалить">
        <DeleteRowOutlined />
      </Tooltip>
    </Popconfirm>
  );
};

//ConfirmDeletionIcon.propTypes = {}

export default ConfirmDeletionIcon;
