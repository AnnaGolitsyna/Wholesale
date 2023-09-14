import React from 'react';
import { Modal } from 'antd';
// import PropTypes from 'prop-types'


const ModalInvoice = ({open, setOpen}) => {

  return (
    <>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        maskClosable={false}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

// ModalInvoice.propTypes = {}

export default ModalInvoice;
