import React, { useState } from 'react';
import { Button, Space, Modal, Form } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as TemplateBox } from '../../../../styles/icons/template/TemplateBox.svg';
import { ReactComponent as CopyIcon } from '../../../../styles/icons/tools/CopyIcon.svg';
import { ReactComponent as SaveIcon } from '../../../../styles/icons/tools/SaveIcon.svg';
import { ReactComponent as ViewIcon } from '../../../../styles/icons/tools/ViewIcon.svg';
import ModalButton from './ModalButton';
import ListDrawer from './ListDrawer';

const CollapsedMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = Form.useFormInstance();
  const templateProdList = JSON.parse(localStorage.getItem('productList'));
  const modifyProdList = (prodList) => {
    const prevProductList = form.getFieldValue('productList') || [];
    const typePrice = form.getFieldValue('priceType').value || 'retail';
    const newProductList = prodList?.map((product) => {
      return {
        ...product,
        selectedPrice: product[typePrice],
        key: uuidv4(),
      };
    });

    form.setFieldsValue({
      productList: [...prevProductList, ...newProductList],
    });
  };

  const setLocalStor = () => {
    // localStorage.setItem('productList', JSON.stringify(form.getFieldValue('productList')));
  };

  const showLocalStor = () => {
    const prodList = JSON.parse(localStorage.getItem('productList'));
    // const prevProductList = form.getFieldValue('productList') || [];
    // const typePrice = form.getFieldValue('priceType').value || 'retail';
    // const newProductList = prodList?.map((product) => {
    //   return {
    //     ...product,
    //     selectedPrice: product[typePrice],
    //     key: uuidv4(),
    //   };
    // });
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <Space onClick={showModal}>
        <TemplateBox />
        <Button>Шаблон</Button>
      </Space>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <ModalButton Icon={CopyIcon} text="Копировать в шаблон" />
          <ModalButton Icon={SaveIcon} text="Добавить все из шаблона" />
          <ListDrawer
            modifyProdList={modifyProdList}
            prodList={templateProdList}
            onCancel={handleCancel}
          />
        </Space>
      </Modal>
    </>
  );
};

export default CollapsedMenu;
