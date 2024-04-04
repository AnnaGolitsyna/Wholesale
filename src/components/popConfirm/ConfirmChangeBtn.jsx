import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm, ConfigProvider } from 'antd';

const ConfirmChangeBtn = ({ ConfirmBtn, onClick, description }) => {
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
        onConfirm={onClick}
        okText="Изменить"
        cancelText="Закрыть"
      >
        <ConfirmBtn onClick={onClick} />
      </Popconfirm>
    </ConfigProvider>
  );
};

ConfirmChangeBtn.propTypes = {
  ConfirmBtn: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export default ConfirmChangeBtn;
