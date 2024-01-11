import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Modal, Form } from 'antd';
import FormForModal from '../../../../components/formForModal/FormForModal';
import { createPayment, updatePayment } from '../../gateway.finance';

const ModalPayment = ({
  isModalOpen,
  closeModal,
  updatePayList,
  data,
  typeData,
  actionType,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const newValue = await form.validateFields();
      setConfirmLoading(true);

      if (actionType === 'create') {
        await createPayment(newValue);
      } else if (actionType === 'edit') {
        const id = data.key;
        await updatePayment(newValue, id);
      }

      await updatePayList();
      setConfirmLoading(false);
      closeModal();
    } catch (error) {
      console.error('Validation failed:', error);
      if (error.errorFields) {
        Modal.error({
          title: 'Не все поля были заполнены корректно',
          content: (
            <>
              {error.errorFields.map(({ errors }, index) => (
                <div key={index}>{errors}</div>
              ))}
            </>
          ),
        });
      } else {
        navigate('/errorPage', { state: { errorData: error } });
      }
    }
  };

  return (
    <Modal
      centered={true}
      open={isModalOpen}
      onOk={handleSubmit}
      okText={'Сохранить'}
      onCancel={closeModal}
      confirmLoading={confirmLoading}
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
      >
        <FormForModal
          form={form}
          typeData={typeData}
          actionType={actionType}
          data={data}
        />
      </Form>
    </Modal>
  );
};

ModalPayment.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updatePayList: PropTypes.func.isRequired,
  data: PropTypes.object,
  typeData: PropTypes.string.isRequired,
  actionType: PropTypes.string,
};

export default ModalPayment;
