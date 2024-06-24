import React, { useState } from 'react';
import { Button, Space, Modal } from 'antd';
import { ReactComponent as TemplateBox } from '../../../../styles/icons/template/TemplateBox.svg';
import { ReactComponent as CopyIcon } from '../../../../styles/icons/tools/CopyIcon.svg';
import { ReactComponent as SaveIcon } from '../../../../styles/icons/tools/SaveIcon.svg';
import { ReactComponent as ViewIcon } from '../../../../styles/icons/tools/ViewIcon.svg';
import ModalButton from './ModalButton';


const CollapsedMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <Space onClick={showModal}>
        <TemplateBox  />
        <Button>Шаблон</Button>
      </Space>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <ModalButton Icon={CopyIcon} text="Копировать в шаблон" />
          <ModalButton Icon={SaveIcon} text="Вставить из шаблона" />
          <ModalButton Icon={ViewIcon} text="Узнай что в шаблоне" />
        </Space>
      </Modal>
    </>
  );
};

export default CollapsedMenu;


