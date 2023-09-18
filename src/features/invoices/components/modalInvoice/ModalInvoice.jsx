import React from 'react';
import { ConfigProvider, Modal } from 'antd';
import FormInvoice from './FormInvoice';
// import PropTypes from 'prop-types'

const ModalInvoice = ({ open, setOpen, color }) => {
  return (
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          colorBgBase: color,
          colorTextBase: 'blue',
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
