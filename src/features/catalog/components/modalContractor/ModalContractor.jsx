import React, { useEffect } from 'react';
import { Modal } from 'antd';
import FormContractor from './FormContractor';
import PropTypes from 'prop-types';


const ModalContractor = ({
  isModalOpen,
  handleOk,
  handleCancel,
  contractor,
  form
}) => {
  
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

  useEffect(() => {
    form.setFieldsValue(contractor);
  }, [contractor, form]);

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
      <FormContractor form={form} initialValues={contractor} />
    </Modal>
  );
};

ModalContractor.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  contractor: PropTypes.shape({
    key: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    name: PropTypes.string,
    fullName: PropTypes.string,
    category: PropTypes.string,
    categoryPrice: PropTypes.string,
    taxNumber: PropTypes.string,
    contractNumber: PropTypes.string,
    contractDate: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    adress: PropTypes.string,
  }),
};

export default ModalContractor;
