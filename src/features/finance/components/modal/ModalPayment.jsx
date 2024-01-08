import React from 'react';
//import PropTypes from 'prop-types'
import { Modal, Form } from 'antd';

import FormForModal from '../../../../components/formForModal/FormForModal';

const ModalPayment = ({
  isModalOpen,
  closeModal,
  data,
  typeData,
  actionType,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
     try {
       const newValue = await form.validateFields();
       console.log('hsubmit', newValue, actionType);

       if (actionType === 'edit') {
       //  await updateItem(newValue);
       } else {
        // await createItem(newValue);
       }
     } catch (error) {
       console.error('Validation failed:', error);
     }
  };

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
