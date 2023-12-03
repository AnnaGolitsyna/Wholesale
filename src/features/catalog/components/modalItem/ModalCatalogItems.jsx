import React from 'react';
import { Modal, Form } from 'antd';
//import PropTypes from 'prop-types';
import FormForModal from '../formForModal/FormForModal';

import { useDispatch } from 'react-redux';
import { closeModal } from '../../contractorsSlice';
import {
  useAddContractorMutation,
  useUpdateContractorMutation,
} from '../../catalogApi';

const ModalCatalogItems = ({ isModalOpen, data, getFormList, typeData }) => {
  const [createContractor] = useAddContractorMutation();
  const [updateContractor] = useUpdateContractorMutation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const newValue = await form.validateFields();
      if (newValue.id) {
        updateContractor(newValue);
      } else {
        createContractor(newValue);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
    dispatch(closeModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };


  return (
    <Form form={form}>
      <Modal
        centered={true}
        open={isModalOpen}
        onOk={handleSubmit}
        okText={'Сохранить'}
        onCancel={handleClose}
        cancelText={'Закрыть'}
        maskClosable={false}
      >
        <FormForModal
          form={form}
          initialValues={data}
          typeData={typeData}
          getFormList={getFormList}
        />
      </Modal>
    </Form>
  );
};

//ModalCatalogItems.propTypes = {}

export default ModalCatalogItems;
