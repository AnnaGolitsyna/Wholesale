import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Modal, Form } from 'antd';
import ModalOpener from './ModalOpener';
import ModalUserError from '../../../../components/modals/ModalUserError';
import FormListComponent from '../forms/FormListComponent';
import ModalFetchError from '../../../../components/modals/ModalFetchError';
import {
  updateRelatedCompaniesInForm,
  updateCustomValueInForm,
  updateProductListInForm,
} from '../../utils/updateFieldsInAdditionalForm';
import { formatDatesInObject } from '../../utils/formatDatesInObject';
import { formatFormValues } from '../../utils/formatFormValues';
import useModalActions from '../../hook/useModalActions';
import { useErrorHandling } from '../../hook/useErrorHandling';
import { useModalVisible } from '../../hook/useModalVisible';
import { FORM_TYPES } from '../../constant/formTypes';


const ModalModifyItems = ({ data, typeData, actionType, elementId }) => {
  const { isModalOpen, showModal, hideModal } = useModalVisible();
  const { userError, firebaseError, handleError, clearErrors } =
    useErrorHandling();

  const [form] = Form.useForm();
    const { createItem, updateItem, getFields, btnText } =
    useModalActions(typeData);
  const { docType } = useParams();

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      if (docType) {
        values.docType = docType;
      }

      if (actionType === 'edit') {
        await updateItem(values);
      } else {
        const formattedValue = formatFormValues(values);
        await createItem(formattedValue);
      }
      hideModal();
    } catch (error) {
      console.error('Validation failed:', error);
      handleError(error);
    }
  }, [
    form,
    hideModal,
    handleError,
    createItem,
    updateItem,
    docType,
    actionType,
  ]);

  const handleFormValuesChange = useCallback(
    (changedValues, allValues) => {
      if ('name' in changedValues) {
        form.setFieldsValue({ fullName: changedValues.name });
      }
    },
    [form]
  );

  const onFormFinish = useCallback(
    (formType, { values, forms }) => {
      const form = forms[typeData];
      const formData = form.getFieldsValue();
      switch (formType) {
        case FORM_TYPES.CONTRACTOR_ADDITIONAL:
          updateRelatedCompaniesInForm(values, formData, form);
          break;
        case FORM_TYPES.INVOICE_PRODUCTS_ADDITIONAL:
          updateProductListInForm(values, formData, form);
          break;
        case FORM_TYPES.INVOICE_EMPTY_ADDITIONAL:
          updateCustomValueInForm(values, formData, form);
          break;
        default:
          break;
      }
    },
    [typeData]
  );


  const formList = getFields(form, actionType, data);

  const formattedData = useMemo(() => formatDatesInObject(data), [data]);

  const modalWidth = typeData === 'Invoice' ? '80%' : undefined;

  return (
    <>
      <ModalOpener
        actionType={actionType}
        onClick={showModal}
        btnText={btnText}
      />
      <Modal
        centered={true}
        open={isModalOpen}
        onOk={handleSubmit}
        okText={'Сохранить'}
        onCancel={hideModal}
        cancelText={'Закрыть'}
        maskClosable={false}
        destroyOnClose
        getContainer={() => document.getElementById(elementId)}
        width={modalWidth}
      >
        <Form.Provider onFormFinish={onFormFinish}>
          <Form
            name={typeData}
            layout="vertical"
            form={form}
            initialValues={formattedData ?? { active: true }}
            preserve={false}
            onValuesChange={handleFormValuesChange}
          >
            <FormListComponent data={formList} />
          </Form>
        </Form.Provider>
      </Modal>

      {userError && <ModalUserError error={userError} onClose={clearErrors} />}
      {firebaseError && (
        <ModalFetchError error={firebaseError} onClose={clearErrors} />
      )}
    </>
  );
};

const commonDataPropTypes = {
  id: PropTypes.string,
  key: PropTypes.string,
  active: PropTypes.bool.isRequired,
  name: PropTypes.string,
  fullName: PropTypes.string,
};

const contractorData = PropTypes.shape({
  ...commonDataPropTypes,
  category: PropTypes.string,
  categoryPrice: PropTypes.string,
  taxNumber: PropTypes.string,
  contractNumber: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  relatedCompanies: PropTypes.array,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
});

const goodsData = PropTypes.shape({
  ...commonDataPropTypes,
  supplier: PropTypes.string,
  cost: PropTypes.number,
  superBulk: PropTypes.number,
  bulk: PropTypes.number,
  retail: PropTypes.number,
  dateStart: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  dateEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
});

const paymentData = PropTypes.shape({
  id: PropTypes.string,
  key: PropTypes.string,
  docNumber: PropTypes.string,
  name: PropTypes.object,
  type: PropTypes.string,
  sum: PropTypes.number,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
});

const invoiceData = PropTypes.shape({
  //id: PropTypes.string,
  key: PropTypes.string,
  name: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  priceType: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  type: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  sum: PropTypes.string,
  docNumber: PropTypes.string,
  productList: PropTypes.array,
});

ModalModifyItems.propTypes = {
  data: PropTypes.oneOfType([
    contractorData,
    goodsData,
    paymentData,
    invoiceData,
  ]),
  typeData: PropTypes.string.isRequired,
  actionType: PropTypes.string,
  elementId: PropTypes.string,
};

export { ModalModifyItems };
