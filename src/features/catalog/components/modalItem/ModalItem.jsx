import React, { useEffect } from 'react';
import { Modal } from 'antd';
import FormContractor from '../formContractor/FormContractor';
import PropTypes from 'prop-types';
import { formattedDateObj } from '../../../../utils/dateUtils';
//import dayjs from 'dayjs';

const ModalItem = ({ isModalOpen, handleOk, handleCancel, data, form }) => {
  
  const onHandleSubmit = () => {
    const formValues = form.getFieldsValue();
    console.log('Form Values:', formValues);
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
    console.log('UE', data, data?.date);
    const formattedData = {
      ...data,
      date: formattedDateObj(data?.date),
    };
    form.setFieldsValue(formattedData);
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
  id: PropTypes.string,
  key: PropTypes.string,
  active: PropTypes.bool.isRequired,
  name: PropTypes.string,
  fullName: PropTypes.string,
  category: PropTypes.string,
  categoryPrice: PropTypes.string,
  taxNumber: PropTypes.string,
  contractNumber: PropTypes.string,
  //contractDate: PropTypes.string,
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
  data: PropTypes.oneOfType([contractorData, goodsData]),
};

export default ModalItem;
