import React, { useEffect } from 'react';
import { Modal } from 'antd';
import FormContractor from '../formContractor/FormContractor';
import PropTypes from 'prop-types';

const ModalItem = ({ isModalOpen, handleOk, handleCancel, data, form }) => {
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
    form.setFieldsValue(data);
  }, [data, form]);

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
      <FormContractor form={form} initialValues={data} />
    </Modal>
  );
};

const contractorData = PropTypes.shape({
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
});

const goodsData = PropTypes.shape({
  key: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  
});

ModalItem.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([contractorData, goodsData]).isRequired,
};

export default ModalItem;
