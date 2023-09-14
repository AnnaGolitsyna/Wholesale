import React from 'react';
import { Modal } from 'antd';
import FormInvoice from './FormInvoice';
// import PropTypes from 'prop-types'

const ModalInvoice = ({ open, setOpen }) => {
  return (
    <>
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
    </>
  );
};

// ModalInvoice.propTypes = {}

export default ModalInvoice;
