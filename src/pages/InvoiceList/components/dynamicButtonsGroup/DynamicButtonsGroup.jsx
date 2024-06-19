import React from 'react';
import { Form, Button, Space, Alert } from 'antd';
import { AddOnModal } from '../../../../features/modifyingItems';
import { ModalToPrint } from '../../../../features/printingDocs';
import { v4 as uuidv4 } from 'uuid';

const DynamicButtonsGroup = () => {
  const form = Form.useFormInstance();
  const handleLocStor = () => {
    const prodList = JSON.parse(localStorage.getItem('productList'));
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

  const invoiceData = {
    docNumber: form.getFieldValue('docNumber'),
    sum: form.getFieldValue('sum'),
    date: form.getFieldValue('date'),
    productList: form.getFieldValue('productList'),
    type: form.getFieldValue('type'),
  };

  console.log('invoiceData', invoiceData);

  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) => !prevValues.name}
    >
      {({ getFieldValue }) => {
        return getFieldValue('name') ? (
          <Space>
            <AddOnModal data={null} typeData="Invoice" actionType="create" />

            <Button onClick={handleLocStor}>Скопировать из шаблона</Button>
            <AddOnModal
              data={null}
              typeData="InvoiceEmpty"
              actionType="create"
            />

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
