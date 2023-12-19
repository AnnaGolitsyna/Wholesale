import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  useAddContractorMutation,
  useUpdateContractorMutation,
  useAddGoodsMutation,
  useUpdateProductMutation,
} from '../../catalogApi';
import { closeModalContractor } from '../../contractorsSlice';
import { closeModalGoods } from '../../goodsSlice';
import { Modal, Form } from 'antd';
import FormForModal from '../formForModal/FormForModal';

const ModalCatalogItems = ({ isModalOpen, data, typeData, actionType }) => {
  const [createContractor] = useAddContractorMutation();
  const [updateContractor] = useUpdateContractorMutation();
  const [createProduct] = useAddGoodsMutation();
  const [updateProduct] = useUpdateProductMutation();
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
        updateItem: updateProduct,
      },
    };

    return actionList[type];
  };

  const { closeModal, createItem, updateItem } = getModalActionList(typeData);

  const handleSubmit = async () => {
    try {
      const newValue = await form.validateFields();
      console.log('hsubmit', newValue, actionType);

      if (actionType === 'edit') {
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

  const handleFormValuesChange = (changedValues, allValues) => {
    if ('name' in changedValues) {
      form.setFieldsValue({ fullName: changedValues.name });
    }
  };

  return (
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
      <Form
        name={typeData}
        layout="vertical"
        form={form}
        initialValues={data}
        preserve={false}
        onValuesChange={handleFormValuesChange}
      >
        <FormForModal form={form} typeData={typeData} actionType={actionType} />
      </Form>
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
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  email: PropTypes.string,
  phone: PropTypes.string,
  adress: PropTypes.string,
});

const goodsData = PropTypes.shape({
  id: PropTypes.string,
  key: PropTypes.string,
  active: PropTypes.bool.isRequired,
  name: PropTypes.string,
  fullName: PropTypes.string,
  supplier: PropTypes.string,
  cost: PropTypes.number,
  superBulk: PropTypes.number,
  bulk: PropTypes.number,
  retail: PropTypes.number,
  dateStart: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  dateEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
});

ModalCatalogItems.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  data: PropTypes.oneOfType([contractorData, goodsData]),
  typeData: PropTypes.string.isRequired,
  actionType: PropTypes.string,
};

export default ModalCatalogItems;
