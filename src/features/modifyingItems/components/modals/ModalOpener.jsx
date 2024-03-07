import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { EditOutlined, CopyOutlined } from '@ant-design/icons';

const ModalOpener = ({ actionType, onClick, btnText }) => {
  const actionObject = {
    edit: <EditOutlined onClick={onClick} />,
    copy: <CopyOutlined onClick={onClick} />,
    create: (
      <Button block type="primary" onClick={onClick}>
        {btnText}
      </Button>
    ),
  };
  return actionObject[actionType];
};

ModalOpener.propTypes = {
  actionType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  btnText: PropTypes.string,
};

ModalOpener.defaultProps = {
  btnText: 'Создать',
};

export default ModalOpener;
