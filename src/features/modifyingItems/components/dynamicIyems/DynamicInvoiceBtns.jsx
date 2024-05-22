import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Space, Alert } from 'antd';
import { AddOnModal } from '../modals/AddOnModal';
import { ModalToPrint } from '../../../printingDocs';

const DynamicInvoiceBtns = (props) => {
  const form = Form.useFormInstance();
  const handleLocStor = () => {
    const prodList = JSON.parse(localStorage.getItem('productList'));
    const typePrice = form.getFieldValue('priceType').value || 'retail';
    const newProductList = prodList?.map((product) => {
      return {
        ...product,
        selectedPrice: product[typePrice],
      };
    });
    // form.setFieldsValue({ ...data????????????????, productList: newProductList });
    form.setFieldsValue({ productList: newProductList });
  };
  return (
    <Form.Item
      noStyle
      shouldUpdate={
        (prevValues, currentValues) => !prevValues.name
        //prevValues.name !== currentValues.name
      }
    >
      {({ getFieldValue }) => {
        return getFieldValue('name') ? (
          <Space>
            <AddOnModal data={null} typeData="Invoice" actionType="create" />
            <Button onClick={handleLocStor}>Скопировать из шаблона</Button>
            <Button type="primary">Заполнить вручную</Button>
            <ModalToPrint data={[]} type="priceList" />
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

DynamicInvoiceBtns.propTypes = {};

export default DynamicInvoiceBtns;
