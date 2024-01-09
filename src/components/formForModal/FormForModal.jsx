import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, theme } from 'antd';
import renderFormItem from './renderFormItem';
import { getFieldsForFormList } from './getFieldsForFormList';

const FormForModal = ({ form, typeData, actionType, data }) => {
  const { token } = theme.useToken();

  const { iconTitle, dynamicTitle, formList } = getFieldsForFormList(
    form,
    typeData,
    actionType,
    data
  );

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
        {iconTitle}
        <Typography.Title
          level={3}
          style={{ marginTop: 0, color: token.colorPrimary }}
        >
          {dynamicTitle}
        </Typography.Title>
      </Space>

      {formList.map((element) => renderFormItem(element))}
    </Space>
  );
};

FormForModal.propTypes = {
  form: PropTypes.object.isRequired,
  typeData: PropTypes.string.isRequired,
  actionType: PropTypes.string,
  data: PropTypes.object,
};

export default FormForModal;
