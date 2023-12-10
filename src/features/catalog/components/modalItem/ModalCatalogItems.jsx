import React from 'react';
import { Modal, Form } from 'antd';
import PropTypes from 'prop-types';
import FormForModal from '../formForModal/FormForModal';

import { useDispatch } from 'react-redux';
import { closeModalContractor } from '../../contractorsSlice';
import { closeModalGoods } from '../../goodsSlice';
import {
  useAddContractorMutation,
  useUpdateContractorMutation,
  useAddGoodsMutation,
} from '../../catalogApi';

const ModalCatalogItems = ({ isModalOpen, data, typeData }) => {
  const [createContractor] = useAddContractorMutation();
  const [updateContractor] = useUpdateContractorMutation();
  const [createProduct] = useAddGoodsMutation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();


  const getModalActionList = (type) => {
    const actionList = {
      Contractor: {
        closeModal: closeModalContractor,
        createItem: createContractor,
        updateItem: updateContractor,
      },
      Goods: {
        closeModal: closeModalGoods,
        createItem: createProduct,
      },
    };

    return actionList[type];
  };

  const { closeModal, createItem, updateItem } = getModalActionList(typeData);

  const handleSubmit = async () => {
    try {
      const newValue = await form.validateFields();
      // debugger;
      if (newValue.id) {
        await updateItem(newValue);
      } else {
        await createItem(newValue);
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
        destroyOnClose
      >
        <FormForModal form={form} initialValues={data} typeData={typeData} />
      </Modal>
    </Form>
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
  // date: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  email: PropTypes.string,
  phone: PropTypes.string,
  adress: PropTypes.string,
});

const goodsData = PropTypes.shape({
  // key: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
});

ModalCatalogItems.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  data: PropTypes.oneOfType([contractorData, goodsData]),
  typeData: PropTypes.string.isRequired,
};

export default ModalCatalogItems;
