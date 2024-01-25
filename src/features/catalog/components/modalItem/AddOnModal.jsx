import React, { useState } from 'react';
//import PropTypes from 'prop-types'
import { theme, Modal, ConfigProvider, Button, Form } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import FormForModal from '../../../../components/formForModal/FormForModal';

const AddOnModal = ({ form, actionType, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = theme.useToken();


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (e) => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log('modal', data, form.getFieldsValue());

  const showBtn =
    actionType === 'edite' ? (
      <EditOutlined onClick={showModal} />
    ) : (
      <Button block type="text" icon={<PlusOutlined />} onClick={showModal}>
        Добавить связанную компанию - посредника
      </Button>
    );
  return (
    <>
      {showBtn}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: token.colorBgAccent,
            },
          },
        }}
      >
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={'Добавить'}
          cancelText={'Закрыть'}
        >
          <Form form={form} initialValues={data} preserve={false}>
            <FormForModal
              form={form}
              typeData="ContractorAdditional"
              actionType={actionType}
              data={data}
            />
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

//AddOnModal.propTypes = {}

export default AddOnModal;
