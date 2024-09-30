import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm, ConfigProvider } from 'antd';
import DefaultCloseButton from './DefaultCloseButton';


const ConfirmChangeBtn = ({
  ConfirmBtn = DefaultCloseButton,
  onConfirm,
  description,
  onClose,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: '#001529',
        },
      }}
    >
      <Popconfirm
        title="Изменение данных"
        description={description}
        onConfirm={onConfirm}
        onCancel={onClose}
        okText="Изменить"
        cancelText="Закрыть"
      >
       
        <ConfirmBtn />
      </Popconfirm>
    </ConfigProvider>
  );
};

ConfirmChangeBtn.propTypes = {
  ConfirmBtn: PropTypes.elementType,
  onConfirm: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default ConfirmChangeBtn;
