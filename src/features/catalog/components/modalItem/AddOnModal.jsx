import React, { useState } from 'react';
//import PropTypes from 'prop-types'
import { theme, Modal, ConfigProvider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormForModal from '../../../../components/formForModal/FormForModal';

const AddOnModal = ({ form }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = theme.useToken();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button block type="text" icon={<PlusOutlined />} onClick={showModal}>
        Добавить связанную компанию - посредника
      </Button>
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
            actionType="create"
            // data={data}
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
