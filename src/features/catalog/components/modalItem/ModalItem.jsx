import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import FormForModal from '../formForModal/FormForModal';


const ModalItem = ({
  isModalOpen,
  handleOk,
  handleCancel,
  data,
  form,
  getFormList,
  onFieldChange,
}) => {

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      handleOk(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleClose = () => {
    handleCancel();
  };

  const handleFieldChange = (value) => {
    onFieldChange(value);
  };

  const { titleObj, formList } = getFormList(handleFieldChange);

  return (
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
  // key: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
});

ModalItem.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([contractorData, goodsData]),
  getFormList: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func,
};

export default ModalItem;
