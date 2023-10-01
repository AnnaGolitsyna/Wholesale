import React, { useId } from 'react';
import { Form, Modal } from 'antd';

import FormContractor from './FormContractor';

// import PropTypes from 'prop-types'

const ModalContractor = ({
  isModalOpen,
  handleOk,
  handleCancel,
  contractor,
}) => {
  const [form] = Form.useForm();
  const id = useId();

  console.log('modal', contractor);

  const initialValues = contractor ?? {
    key: id,
    active: true,
  };

  console.log('initV', initialValues);

  const onHandleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleOk(values);
        form.resetFields();
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  const onHandleClose = () => {
    handleCancel();
    form.resetFields();
  };

  return (
    <Modal
      centered={true}
      open={isModalOpen}
      onOk={onHandleSubmit}
      okText={'Сохранить'}
      onCancel={onHandleClose}
      cancelText={'Закрыть'}
      maskClosable={false}
    >
      <FormContractor form={form} initialValues={initialValues} />
    </Modal>
  );
};

// ModalContractor.propTypes = {}

export default ModalContractor;
