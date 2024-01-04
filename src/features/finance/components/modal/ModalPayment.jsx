import React from 'react';
//import PropTypes from 'prop-types'
import { Modal, Form } from 'antd';

import FormForModal from '../../../catalog/components/formForModal/FormForModal';
import { act } from 'react-dom/test-utils';

const ModalPayment = ({
  isModalOpen,
  closeModal,
  data,
  typeData,
  actionType,
}) => {
  const [form] = Form.useForm();
  const handleSubmit = async () => {};

  //   const handleClose = () => {
  //     closeModal();
  //   };

  return (
    <Modal
      centered={true}
      open={isModalOpen}
      onOk={handleSubmit}
      okText={'Сохранить'}
      onCancel={closeModal}
      cancelText={'Закрыть'}
      maskClosable={false}
      destroyOnClose
    >
      <Form
        name={typeData}
        layout="vertical"
        form={form}
        initialValues={data}
        preserve={false}
      >
        <FormForModal form={form} typeData={typeData} actionType={actionType} />
      </Form>
    </Modal>
  );
};

//ModalPayment.propTypes = {}

export default ModalPayment;
