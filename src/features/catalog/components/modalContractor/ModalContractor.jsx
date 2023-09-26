import React, { useId } from 'react';
import { Form, Modal } from 'antd';

import FormContractor from './FormContractor';

import { categoryContractor } from '../../utils/categoryContractor';
// import PropTypes from 'prop-types'

const ModalContractor = ({ isModalOpen, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const id = useId();

  const initialValues = {
    key: id,
  };

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
      <FormContractor
        form={form}
        initialValues={initialValues}
        category={categoryContractor}
      />
    </Modal>
  );
};

// ModalContractor.propTypes = {}

export default ModalContractor;
