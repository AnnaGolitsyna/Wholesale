import React from 'react';
//import PropTypes from 'prop-types'
import { Modal, Form } from 'antd';

import FormForModal from '../../../../components/formForModal/FormForModal';
import { createPayment, updatePayment } from '../../gateway.finance';

const ModalPayment = ({
  isModalOpen,
  closeModal,
  updatePayList,
  data,
  typeData,
  actionType,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const newValue = await form.validateFields();
      const id = data.key;
      console.log('hsubmit', newValue, actionType, data);
      if (actionType === 'create') {
        await createPayment(newValue);
      }

      if (actionType === 'edit') {
        await updatePayment(id, newValue);
      }
      await updatePayList();
      closeModal();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

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
        <FormForModal
          form={form}
          typeData={typeData}
          actionType={actionType}
          data={data}
        />
      </Form>
    </Modal>
  );
};

//ModalPayment.propTypes = {}

export default ModalPayment;
