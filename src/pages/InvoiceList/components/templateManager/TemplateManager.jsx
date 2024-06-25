import React, { useState } from 'react';
import { Button, Space, Modal, Form, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as TemplateIcon } from '../../../../styles/icons/template/TemplateBox.svg';
import { ReactComponent as CopyIcon } from '../../../../styles/icons/tools/CopyIcon.svg';
import { ReactComponent as SaveIcon } from '../../../../styles/icons/tools/SaveIcon.svg';
import TemplateAction from './TemplateAction';
import TemplateDrawer from './TemplateDrawer';

const TemplateManager = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const form = Form.useFormInstance();

  const templateProducts =
    JSON.parse(localStorage.getItem('productList')) || [];

  const addProductsToForm = (products) => {
    const currentProducts = form.getFieldValue('productList') || [];
    const priceType = form.getFieldValue('priceType')?.value || 'retail';
    const newProducts = products?.map((product) => ({
      ...product,
      selectedPrice: product[priceType],
      key: uuidv4(),
    }));

    form.setFieldsValue({
      productList: [...currentProducts, ...newProducts],
    });
  };

  const saveToTemplate = () => {
    localStorage.setItem(
      'productList',
      JSON.stringify(form.getFieldValue('productList'))
    );
    setIsModalVisible(false);
    messageApi.success('Товары сохранены в шаблон');
  };

  const loadFromTemplate = () => {
    const templateProducts = JSON.parse(localStorage.getItem('productList'));
    addProductsToForm(templateProducts);
    messageApi.success(`Добавлено ${templateProducts.length} эл.`);
    setIsModalVisible(false);
  };

  return (
    <>
      {contextHolder}
      <Space onClick={() => setIsModalVisible(true)}>
        <TemplateIcon />
        <Button>Шаблон</Button>
      </Space>

      <Modal
        title={
          <div
            style={{
              textAlign: 'center',
              width: '100%',
              fontSize: 18,
            }}
          >
            Действия с шаблоном
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <TemplateAction
            Icon={CopyIcon}
            text="Копировать в шаблон"
            onClick={saveToTemplate}
          />
          <TemplateAction
            Icon={SaveIcon}
            text="Добавить все из шаблона"
            onClick={loadFromTemplate}
          />
          <TemplateDrawer
            products={templateProducts}
            addProducts={addProductsToForm}
            onClose={() => setIsModalVisible(false)}
          />
        </Space>
      </Modal>
    </>
  );
};

export default TemplateManager;
