import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Space, Typography } from 'antd';
import renderFormItem from './renderFormItem';
import updateProductPrices from '../../utils/updateProductPrices';
import { getFieldsForContractorsFormList } from '../../utils/contractors/FormLists';
import { getFieldsForGoodsFormList } from '../../utils/goods/FormList';

const FormForModal = ({ form, initialValues, typeData }) => {
  const handleFieldChange = (value) => {
    updateProductPrices(value, typeData, form);
  };

  const getFormList =
    typeData === 'Contractor'
      ? getFieldsForContractorsFormList
      : getFieldsForGoodsFormList;

  const {
    titleObj: { icon, titleText },
    formList,
  } = getFormList(handleFieldChange);

  return (
    <Form
      name={typeData}
      layout="vertical"
      form={form}
      initialValues={initialValues}
    >
      <Space.Compact
        block
        style={{
          alignItems: 'flex-end',
          justifyContent: 'space-evenly',
          marginBottom: 10,
        }}
      >
        {icon}
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          {titleText}
        </Typography.Title>
        <Form.Item name={'id'} style={{ display: 'none' }}>
          <Input type="hidden" />
        </Form.Item>
      </Space.Compact>

      {formList.map((element) => renderFormItem(element))}
    </Form>
  );
};

FormForModal.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  typeData: PropTypes.string,
};

export default FormForModal;
