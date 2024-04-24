import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Popconfirm, message } from 'antd';
import { DeleteRowOutlined } from '@ant-design/icons';

const ConfirmDeletionIcon = ({ handleClick }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const confirm = () => {
    handleClick();
    //message.error('Данные удалены');
    messageApi.open({
      duration: 5,
      type: 'error',
      content: 'Данные удалены',
    });

  };

  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          inherit: false,
          token: {
            colorBgBase: '#efd7c1',
          },
          components: {
            Popconfirm: {
              colorWarning: '#b30002',
              colorText: '#200000',
              colorTextHeading: '#4b0001',
            },
          },
        }}
      >
        <Popconfirm
          title="Удаление"
          description="Вы действительно хотите удалить эту строку?"
          okText="Удалить"
          cancelText="Закрыть"
          onConfirm={() => confirm()}
          placement="left"
        >
          <DeleteRowOutlined />
        </Popconfirm>
      </ConfigProvider>

    </>
  );
};

ConfirmDeletionIcon.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ConfirmDeletionIcon;
