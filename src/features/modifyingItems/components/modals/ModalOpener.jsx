import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { EditOutlined, CopyOutlined } from '@ant-design/icons';

const actionObject = {
  edit: (onClick) => <EditOutlined onClick={onClick} />,
  copy: (onClick) => <CopyOutlined onClick={onClick} />,
  create: (onClick, btnText) => (
    <Button block type="primary" onClick={onClick}>
      {btnText}
    </Button>
  ),
};

const ModalOpener = React.memo(({ actionType, onClick, btnText }) => {
  return actionObject[actionType](onClick, btnText);
});

ModalOpener.propTypes = {
  actionType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  btnText: PropTypes.string,
};

ModalOpener.defaultProps = {
  btnText: 'Создать',
};

export default ModalOpener;
