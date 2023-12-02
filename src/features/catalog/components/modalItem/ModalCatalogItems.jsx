import React from 'react';
import { Modal, Form } from 'antd';
//import PropTypes from 'prop-types';
import FormForModal from '../formForModal/FormForModal';

import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../../contractorsSlice';
import {
  useAddContractorMutation,
  useUpdateContractorMutation,
} from '../../catalogApi';
import updateProductPrices from '../../utils/updateProductPrices';

const ModalCatalogItems = ({ isModalOpen, data, getFormList }) => {
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
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleFieldChange = (value) => {
    //onFieldChange(value);
    //form.setFieldsValue({ categoryPrice: undefined });
    updateProductPrices(value, 'Contractor', form);
  };

  const { titleObj, formList } = getFormList(handleFieldChange);

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
          formList={formList}
          titleObj={titleObj}
        />
      </Modal>
    </Form>
  );
};

//ModalCatalogItems.propTypes = {}

export default ModalCatalogItems;
