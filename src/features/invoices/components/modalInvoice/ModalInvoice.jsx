import React from 'react';
import { ConfigProvider, Modal } from 'antd';
import FormInvoice from './FormInvoice';
import { theme } from 'antd';
// import PropTypes from 'prop-types'

const { useToken } = theme;

const ModalInvoice = ({ open, setOpen, type }) => {
  const { token } = useToken();
  const bgColor =
    type === 'debet'
      ? token.modalBgPrimary
      : token.modalBgSecondary;
  return (
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          colorBgBase: bgColor,
          colorTextBase: token.modalText,
          fontSize: 16,
        },
      }}
    >
      <Modal
        centered
        // confirmLoading
        open={open}
        onOk={() => setOpen(false)}
        okText="Сохранить"
        onCancel={() => setOpen(false)}
        cancelText="Закрыть"
        width={1000}
        maskClosable={false}
      >
        <FormInvoice />
      </Modal>
    </ConfigProvider>
  );
};

// ModalInvoice.propTypes = {}

export default ModalInvoice;
