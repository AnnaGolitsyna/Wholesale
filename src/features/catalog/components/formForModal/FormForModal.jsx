import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Space, Typography } from 'antd';
import renderFormItem from './renderFormItem';

const FormForModal = ({ form, initialValues, formList, titleObj }) => {
  return (
    <Form
      name="catalogForm"
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
        {titleObj.icon}
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          {titleObj.titleText}
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
  // form: PropTypes.object.isRequired,
  // initialValues: PropTypes.object,
  // formList: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     name: PropTypes.string,
  //     label: PropTypes.node,
  //     component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  //     condition: PropTypes.string,
  //     rules: PropTypes.array,
  //     hasFeedback: PropTypes.bool,
  //     tooltip: PropTypes.string,
  //     valuePropName: PropTypes.string,
  //     children: PropTypes.array,
  //   })
  // ),
  titleObj: PropTypes.object,
};

export default FormForModal;
