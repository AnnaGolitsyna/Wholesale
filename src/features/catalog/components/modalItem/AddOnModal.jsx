import React, { useState } from 'react';
//import PropTypes from 'prop-types'
import { theme, Modal, ConfigProvider, Button } from 'antd';
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
      {/* <Button block type="text" icon={<PlusOutlined />} onClick={showModal}>
        Добавить связанную компанию - посредника
      </Button> */}
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
          <FormForModal
            form={form}
            typeData="ContractorAdditional"
            actionType={actionType}
            data={data}
          />
        </Modal>
      </ConfigProvider>
      {/* <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <FormForModal
            form={form}
            typeData="ContractorAdditional"
            actionType="create"
            // data={data}
          />
        </Modal> */}
    </>
  );
};

//AddOnModal.propTypes = {}

export default AddOnModal;
