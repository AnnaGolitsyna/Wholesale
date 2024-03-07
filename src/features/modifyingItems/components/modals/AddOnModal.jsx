import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { theme, Modal, ConfigProvider, Button, Form, message } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { getFieldsForFormList } from '../../utils/getFieldsForFormList';
import renderFormItem from '../forms/renderFormItem';
import ModalOpener from './ModalOpener';
import useModalActions from '../../hook/useModalActions';

const AddOnModal = ({ typeData, actionType, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const typeAddData = `${typeData}Additional`;

  const { btnText } = useModalActions(typeAddData);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = async () => {
    try {
      await form.validateFields();
      form.submit();
      setIsModalOpen(false);
      messageApi.open({
        duration: 5,
        type: 'warning',
        content:
          'Для сохранения изменений в данных о клиенте нажмите "Сохранить"',
      });
    } catch (error) {
      console.error('Validation error', error);
      Modal.error({
        title: 'Не все поля были заполнены корректно',
        content: (
          <>
            {error.errorFields.map(({ errors, name }, index) => (
              <div key={index}>{`${errors}: ${name}`}</div>
            ))}
          </>
        ),
      });
    }
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    if ('name' in changedValues) {
      form.setFieldsValue({ fullName: changedValues.name });
    }
  };

  const formList = getFieldsForFormList(form, typeAddData, actionType);

  // const showBtn =
  //   actionType === 'edit' ? (
  //     <EditOutlined onClick={showModal} />
  //   ) : (
  //     <Button block type="text" icon={<PlusOutlined />} onClick={showModal}>
  //       Добавить связанную компанию - посредника
  //     </Button>
  //   );

  return (
    <>
      {/* {showBtn} */}
      {
        <ModalOpener
          actionType={actionType}
          onClick={showModal}
          btnText={btnText}
        />
      }
      {contextHolder}
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
          okText={'Обновить'}
          cancelText={'Закрыть'}
          maskClosable={false}
          destroyOnClose
        >
          <Form
            name={`${typeData}Additional`}
            form={form}
            initialValues={data}
            preserve={false}
            onValuesChange={handleFormValuesChange}
          >
            {formList?.map((formItem) => (
              <Form.Item key={formItem.keyname} {...formItem}>
                {renderFormItem(formItem)}
              </Form.Item>
            ))}
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

AddOnModal.propTypes = {
  typeData: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired,
  data: PropTypes.object,
};

export { AddOnModal };
