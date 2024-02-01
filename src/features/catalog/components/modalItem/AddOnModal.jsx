import React, { useState } from 'react';
//import PropTypes from 'prop-types'
import { theme, Modal, ConfigProvider, Button, Form } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { getFieldsForFormList } from '../../../../components/formForModal/getFieldsForFormList';
import renderFormItem2 from '../../../../components/formForModal/renderFormItem2';


const AddOnModal = ({ typeData, actionType, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = theme.useToken();

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const formList = getFieldsForFormList(
    form,
    `${typeData}Additional`,
    actionType
  );

  // console.log('addModal', formList);

  const showBtn =
    actionType === 'edite' ? (
      <EditOutlined onClick={showModal} />
    ) : (
      <Button block type="text" icon={<PlusOutlined />} onClick={showModal}>
        Добавить связанную компанию - посредника
      </Button>
    );
  return (
    <>
      {showBtn}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: token.colorBgAccent,
            },
          },
        }}
      >
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={'Добавить'}
          cancelText={'Закрыть'}
          maskClosable={false}
          destroyOnClose
        >
          <Form
            name="additional"
            form={form}
            initialValues={data}
            // preserve={false}
          >
            {formList?.map((item) => {
              return (
                <Form.Item key={item.name} {...item}>
                  {renderFormItem2(item)}
                </Form.Item>
              );
            })}
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

//AddOnModal.propTypes = {}

export default AddOnModal;
