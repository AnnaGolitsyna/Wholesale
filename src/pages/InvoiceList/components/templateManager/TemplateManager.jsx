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
// import React, { useState } from 'react';
// import { Button, Space, Modal, Form, message } from 'antd';
// import { v4 as uuidv4 } from 'uuid';
// import { ReactComponent as TemplateBox } from '../../../../styles/icons/template/TemplateBox.svg';
// import { ReactComponent as CopyIcon } from '../../../../styles/icons/tools/CopyIcon.svg';
// import { ReactComponent as SaveIcon } from '../../../../styles/icons/tools/SaveIcon.svg';
// import ModalButton from './ModalButton';
// import ListDrawer from './ListDrawer';

// const CollapsedMenu = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [messageApi, contextHolder] = message.useMessage();

//   const form = Form.useFormInstance();
//   const templateProdList =
//     JSON.parse(localStorage.getItem('productList')) || [];
//   const modifyProdList = (prodList) => {
//     const prevProductList = form.getFieldValue('productList') || [];
//     const typePrice = form.getFieldValue('priceType').value || 'retail';
//     const newProductList = prodList?.map((product) => {
//       return {
//         ...product,
//         selectedPrice: product[typePrice],
//         key: uuidv4(),
//       };
//     });

//     form.setFieldsValue({
//       productList: [...prevProductList, ...newProductList],
//     });
//   };

//   const setLocalStor = () => {
//     localStorage.setItem(
//       'productList',
//       JSON.stringify(form.getFieldValue('productList'))
//     );
//     setIsModalOpen(false);
//   };

//   const getLocalStor = () => {
//     const prodList = JSON.parse(localStorage.getItem('productList'));
//     modifyProdList(prodList);
//     messageApi.success(`Добавлено ${prodList.length} эл.`);
//     setIsModalOpen(false);
//   };

//   const showModal = () => setIsModalOpen(true);
//   const handleCancel = () => setIsModalOpen(false);

//   return (
//     <>
//       {contextHolder}
//       <Space onClick={showModal}>
//         <TemplateBox />
//         <Button>Шаблон</Button>
//       </Space>

//       <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
//         <Space direction="vertical" style={{ width: '100%' }}>
//           <ModalButton
//             Icon={CopyIcon}
//             text="Копировать в шаблон"
//             onClick={setLocalStor}
//           />
//           <ModalButton
//             Icon={SaveIcon}
//             text="Добавить все из шаблона"
//             onClick={getLocalStor}
//           />
//           <ListDrawer
//             prodList={templateProdList}
//             modifyProdList={modifyProdList}
//             onCancel={handleCancel}
//           />
//         </Space>
//       </Modal>
//     </>
//   );
// };

// export default CollapsedMenu;
