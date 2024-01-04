import React from 'react'
//import PropTypes from 'prop-types'
import { Modal, Form } from 'antd';

const ModalPayment = ({ isModalOpen, closeModal }) => {
  const [form] = Form.useForm();
  const handleSubmit = async () => {};

  const handleClose = () => {
    closeModal();
  };
  
  return (
    <Modal
      centered={true}
      open={isModalOpen}
      onOk={handleSubmit}
      okText={'Сохранить'}
      onCancel={handleClose}
      cancelText={'Закрыть'}
      maskClosable={false}
      destroyOnClose
    >
      <Form
        // name={typeData}
        layout="vertical"
        form={form}
        // initialValues={data}
        preserve={false}
      >
        {/* <FormForModal form={form} /> */}
      </Form>
    </Modal>
  );
};

//ModalPayment.propTypes = {}

export default ModalPayment