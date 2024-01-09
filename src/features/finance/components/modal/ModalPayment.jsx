import React, { useEffect } from 'react';
//import PropTypes from 'prop-types'
import { collection, addDoc } from 'firebase/firestore';
import { Modal, Form } from 'antd';

import FormForModal from '../../../../components/formForModal/FormForModal';
import { fetchPaimentsList, createPayment } from '../../gateway.finance';

import { db } from '../../../../config/firestore';

const ModalPayment = ({
  isModalOpen,
  closeModal,
  updateData,
  data,
  typeData,
  actionType,
}) => {
  const [form] = Form.useForm();

  // useEffect(() => {
  //   fetchPaimentsList();
  // }, []);

  const handleSubmit = async () => {
    try {
      const newValue = await form.validateFields();
      console.log('hsubmit', newValue, actionType);
      if (actionType === 'create') {
        createPayment(newValue);
      }

      updateData();
      closeModal();
      // const formattedDate = newValue.date.format('YYYY-MM-DD');
      // const docRef = await addDoc(collection(db, 'payments'), {
      //   ...newValue,
      //   date: formattedDate,
      // });
      // console.log('Document written with ID: ', docRef.id);

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

//ModalPayment.propTypes = {}

export default ModalPayment;
