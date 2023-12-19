import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Space, Typography, theme } from 'antd';
import renderFormItem from './renderFormItem';
import { getFieldsForContractorsFormList } from '../../utils/contractors/FormLists';
import { getFieldsForGoodsFormList } from '../../utils/goods/FormList';

const FormForModal = ({ form, typeData, actionType }) => {
  const { token } = theme.useToken();
  const getFormList =
    typeData === 'Contractor'
      ? getFieldsForContractorsFormList
      : getFieldsForGoodsFormList;

  const {
    titleObj: { icon, titleText },
    formList,
  } = getFormList(form);

  const dynamicField = titleText[actionType] || 'Просмотр инормации';

  return (
    <Space direction="vertical">
      <Space
        size="large"
        style={{
          alignItems: 'flex-end',
          justifyContent: 'space-evenly',
          marginBottom: 10,
        }}
      >
        {icon}
        <Typography.Title
          level={3}
          style={{ marginTop: 0, color: token.colorPrimary }}
        >
          {dynamicField}
        </Typography.Title>
      </Space>

      {formList.map((element) => renderFormItem(element))}
    </Space>
  );
};

FormForModal.propTypes = {
  form: PropTypes.object.isRequired,
  typeData: PropTypes.string,
  actionType: PropTypes.string,
};

export default FormForModal;
