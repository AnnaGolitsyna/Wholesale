import React from 'react';
import { Form, Button, Space, Alert } from 'antd';
import { AddOnModal } from '../../../../features/modifyingItems';
import { ModalToPrint } from '../../../../features/printingDocs';
import { v4 as uuidv4 } from 'uuid';
import CollapsedMenu from '../collapsedMenu/CollapsedMenu';
import { ReactComponent as SearchListIcon } from '../../../../styles/icons/search/SearchListIcon.svg';
import { ReactComponent as PencilEditIcon } from '../../../../styles/icons/tools/PencilEditIcon.svg';

const DynamicButtonsGroup = () => {
  const form = Form.useFormInstance();
  // const handleLocStor = () => {
  //   const prodList = JSON.parse(localStorage.getItem('productList'));
  //   const prevProductList = form.getFieldValue('productList') || [];
  //   const typePrice = form.getFieldValue('priceType').value || 'retail';
  //   const newProductList = prodList?.map((product) => {
  //     return {
  //       ...product,
  //       selectedPrice: product[typePrice],
  //       key: uuidv4(),
  //     };
  //   });

  //   form.setFieldsValue({
  //     productList: [...prevProductList, ...newProductList],
  //   });
  // };

  const invoiceData = {
    docNumber: form.getFieldValue('docNumber'),
    sum: form.getFieldValue('sum'),
    date: form.getFieldValue('date'),
    productList: form.getFieldValue('productList'),
    type: form.getFieldValue('type'),
    name: form.getFieldValue('name'),
  };

  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) => !prevValues.name}
    >
      {({ getFieldValue }) => {
        return getFieldValue('name') ? (
          <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Space>
              <SearchListIcon />
              <AddOnModal data={null} typeData="Invoice" actionType="create" />
            </Space>

            <CollapsedMenu />
            {/* <Button onClick={handleLocStor}>Скопировать из шаблона</Button> */}
            <Space>
              <PencilEditIcon />
              <AddOnModal
                data={null}
                typeData="InvoiceEmpty"
                actionType="create"
              />
            </Space>

            <ModalToPrint data={invoiceData} type="invoice" />
          </Space>
        ) : (
          <Alert
            description="Добавить товары можно после заполнения полей со звездочкой"
            type="info"
            showIcon
          />
        );
      }}
    </Form.Item>
  );
};

export default DynamicButtonsGroup;
