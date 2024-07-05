import React from 'react';
import PropTypes from 'prop-types';
import { theme, Modal, ConfigProvider, Form, message } from 'antd';
import ModalOpener from './ModalOpener';
import FormListComponent from '../forms/FormListComponent';
import ModalUserError from '../../../../components/modals/ModalUserError';
import useModalActions from '../../hook/useModalActions';
import { useErrorHandling } from '../../hook/useErrorHandling';
import { useModalVisible } from '../../hook/useModalVisible';
import { FORM_TYPES } from '../../../../constants/formTypes';

const AddOnModal = ({ data, typeData, actionType }) => {
  const { isModalOpen, showModal, hideModal } = useModalVisible();
  const { userError, handleError, clearErrors } = useErrorHandling();

  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // delete
 // const typeAddData = `${typeData}Additional`;

  const { getFields, btnText } = useModalActions(typeData);

  const handleOk = async () => {
    try {
      await form.validateFields();
      console.log('handleOk', form.getFieldsValue('count'));
      form.submit();
      hideModal();
      messageApi.open({
        duration: 5,
        type: 'warning',
        content:
          'Для сохранения изменений в данных о клиенте нажмите "Сохранить"',
      });
    } catch (error) {
      console.error('Validation error', error);
      handleError(error);
    }
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    if ('name' in changedValues) {
      form.setFieldsValue({ fullName: changedValues.name });
    }
  };

  
  const formList = getFields(form, actionType, data);

  const modalWidth = typeData === FORM_TYPES.INVOICE_PRODUCTS_ADDITIONAL ? '80%' : undefined;

  const okBtnText = actionType === 'edit' ? 'Обновить' : 'Сохранить';

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
          onCancel={hideModal}
          okText={okBtnText}
          cancelText={'Закрыть'}
          maskClosable={false}
          destroyOnClose
          width={modalWidth}
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
      {userError && <ModalUserError error={userError} onClose={clearErrors} />}
    </>
  );
};

AddOnModal.propTypes = {
  data: PropTypes.object,
  typeData: PropTypes.oneOf([
    FORM_TYPES.CONTRACTOR_ADDITIONAL,
    FORM_TYPES.INVOICE_PRODUCTS_ADDITIONAL,
    FORM_TYPES.INVOICE_EMPTY_ADDITIONAL,
  ]).isRequired,
  actionType: PropTypes.oneOf(['create', 'edit']).isRequired,
};

export { AddOnModal };


