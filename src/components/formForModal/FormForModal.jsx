import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, theme } from 'antd';
import renderFormItem from './renderFormItem';


const FormForModal = ({ icon, dynamicTitle, formList }) => {
  const { token } = theme.useToken();

console.log('type', icon, dynamicTitle, formList);

  // const { icon, dynamicTitle, formList } = getFieldsForFormList(
  //   form,
  //   typeData,
  //   actionType
  // );

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
          {dynamicTitle}
        </Typography.Title>
      </Space>

      {formList.map((element) => renderFormItem(element))}
    </Space>
  );
};

FormForModal.propTypes = {
  // icon: PropTypes.object.isRequired,
  // dynamicTitle: PropTypes.string.isRequired,
  // formList: PropTypes.array.isRequired,
};

export default FormForModal;
