import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { theme, Modal, ConfigProvider, Form, message } from 'antd';
import ModalOpener from './ModalOpener';
import FormListComponent from '../forms/FormListComponent';
import ModalError from '../../../../components/modals/ModalError';
import useModalActions from '../../hook/useModalActions';
import { getFieldsForFormList } from '../../utils/getFieldsForFormList';



const AddOnModal = ({ data, typeData, actionType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
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
      setError(error);
    }
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    if ('name' in changedValues) {
      form.setFieldsValue({ fullName: changedValues.name });
    }
  };

  const formList = getFieldsForFormList(form, typeAddData, actionType);

  return (
    <>
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
            <FormListComponent data={formList} />
          </Form>
        </Modal>
      </ConfigProvider>
      {error && <ModalError error={error} onClose={() => setError(null)} />}
    </>
  );
};

AddOnModal.propTypes = {
  typeData: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired,
  data: PropTypes.object,
};

export { AddOnModal };
