import React from 'react';
//import PropTypes from 'prop-types'
import { collection, addDoc } from 'firebase/firestore';
import { Modal, Form } from 'antd';

import FormForModal from '../../../../components/formForModal/FormForModal';
import { getFieldsForFormList } from '../../../../components/formForModal/getFieldsForFormList';

import { db } from '../../../../config/firestore';

const ModalPayment = ({
  isModalOpen,
  closeModal,
  data,
  typeData,
  actionType,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const newValue = await form.validateFields();
      const formattedDate = newValue.date.format('YYYY-MM-DD');
      console.log('hsubmit', newValue, formattedDate, actionType);
      const docRef = await addDoc(collection(db, 'payments'), {
        ...newValue,
        date: formattedDate,
      });
      console.log('Document written with ID: ', docRef.id);

      if (actionType === 'edit') {
        //  await updateItem(newValue);
      } else {
        // await createItem(newValue);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  //   const handleClose = () => {
  //     closeModal();
  //   };

  const { icon, dynamicTitle, formList } = getFieldsForFormList(
    form,
    typeData,
    actionType,
    data,
  );

  return (
    <Modal
      centered={true}
      open={isModalOpen}
      onOk={handleSubmit}
      okText={'Сохранить'}
      onCancel={closeModal}
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
        <FormForModal icon={icon} dynamicTitle={dynamicTitle} formList={formList} />
      </Form>
    </Modal>
  );
};

//ModalPayment.propTypes = {}

export default ModalPayment;
