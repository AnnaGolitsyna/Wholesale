import React, {useState} from 'react'
import { Input, Modal, Checkbox, Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <div>Let's jump</div>
      <div>Right in</div>
      <Button
        block
        type="text"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Добавить связанную компанию - посредника
      </Button>
       <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
    
  );
}

export default TestPage