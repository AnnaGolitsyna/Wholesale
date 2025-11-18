import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { theme, Modal, ConfigProvider, Form, message } from 'antd';
import ModalOpener from './ModalOpener';
import FormListComponent from '../forms/FormListComponent';
import ModalUserError from '../../../../components/modals/ModalUserError';
import useModalActions from '../../hook/useModalActions';
import { useErrorHandling } from '../../hook/useErrorHandling';
import { useModalVisible } from '../../hook/useModalVisible';
import { FORM_TYPES, FORM_ACTIONS } from '../../../../constants/formTypes';

const AddOnModal = ({ data, typeData, actionType, disabled }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { isModalOpen, showModal, hideModal } =
    useModalVisible(setConfirmLoading);
  const { userError, handleError, clearErrors } = useErrorHandling();

  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { getFields, btnText } = useModalActions(typeData);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await form.validateFields();

      // ✅ Special handling for CONTRACTOR_ORDER_ADDITIONAL
      if (typeData === FORM_TYPES.CONTRACTOR_ORDER_ADDITIONAL) {
        const selectedProducts = form.getFieldValue('selectedProducts') || [];

        if (!selectedProducts.length) {
          messageApi.warning('Выберите хотя бы один товар для добавления');
          setConfirmLoading(false);
          return;
        }

        console.log('Adding products to order:', selectedProducts);
      }

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
      setConfirmLoading(false); // ✅ Reset loading on error
    }
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    if ('name' in changedValues) {
      form.setFieldsValue({ fullName: changedValues.name });
    }
  };

  const formList = getFields(form, actionType, data);

  const modalWidth =
    typeData === FORM_TYPES.INVOICE_PRODUCTS_ADDITIONAL ||
    typeData === FORM_TYPES.CONTRACTOR_ORDER_ADDITIONAL // ✅ ADDED
      ? '80%'
      : undefined;

  const okBtnText = actionType === FORM_ACTIONS.EDIT ? 'Обновить' : 'Сохранить';

  return (
    <>
      {
        <ModalOpener
          actionType={actionType}
          onClick={showModal}
          btnText={btnText}
          disabled={disabled}
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
          confirmLoading={confirmLoading}
        >
          <Form
            name={typeData}
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
    FORM_TYPES.CONTRACTOR_ORDER_ADDITIONAL, // ✅ ADDED
  ]).isRequired,
  actionType: PropTypes.oneOf([FORM_ACTIONS.CREATE, FORM_ACTIONS.EDIT])
    .isRequired,
  disabled: PropTypes.bool,
};

export { AddOnModal };
