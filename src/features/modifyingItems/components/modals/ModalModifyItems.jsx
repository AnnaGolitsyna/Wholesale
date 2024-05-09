import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'antd';
import ModalOpener from './ModalOpener';
import ModalUserError from '../../../../components/modals/ModalUserError';
import FormListComponent from '../forms/FormListComponent';
import useModalActions from '../../hook/useModalActions';
import { getFieldsForFormList } from '../../utils/getFieldsForFormList';
import { updateRelatedCompaniesInForm } from '../../utils/updateFieldsInAdditionalForm';
import { formatDatesInObject } from '../../utils/formatDatesInObject';

import ModalFetchError from '../../../../components/modals/ModalFetchError';

const ModalModifyItems = ({ data, typeData, actionType, elementId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userError, setUserError] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);
  const [form] = Form.useForm();
  const { createItem, updateItem, btnText } = useModalActions(typeData);

  const showModal = () => {
    console.log('showModal', data, typeData, actionType);
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = async () => {
    try {
      const newValue = await form.validateFields();
      console.log('hsubmit', newValue, actionType);

      if (actionType === 'edit') {
        await updateItem(newValue);
      } else {
        const formattedValue = Object.keys(newValue).reduce((acc, key) => {
          acc[key] = newValue[key] === undefined ? null : newValue[key];
          return acc;
        }, {});
        console.log('formattedValue', newValue, formattedValue);
        await createItem(formattedValue);
      }
      handleCancel();
    } catch (error) {
      console.error('Validation failed:', error);
      error.errorFields ? setUserError(error) : setFirebaseError(error.message);
    }
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    if ('name' in changedValues) {
      form.setFieldsValue({ fullName: changedValues.name });
    }
  };

  const formList = getFieldsForFormList(form, typeData, actionType, data);

  const formattedData = formatDatesInObject(data);

  const modalWidth = typeData === 'Invoice' ? '80%' : undefined;

  return (
    <>
      {
        <ModalOpener
          actionType={actionType}
          onClick={showModal}
          btnText={btnText}
        />
      }
      <Modal
        centered={true}
        open={isModalOpen}
        onOk={handleSubmit}
        okText={'Сохранить'}
        onCancel={handleCancel}
        cancelText={'Закрыть'}
        maskClosable={false}
        destroyOnClose
        getContainer={() => document.getElementById(elementId)}
        width={modalWidth}
      >
        <Form.Provider
          onFormFinish={(formType, { values, forms }) => {
            const form = forms[typeData];
            const formData = form.getFieldsValue();
            if (formType === 'ContractorAdditional') {
              updateRelatedCompaniesInForm(values, formData, form);
            }
            if (formType === 'InvoiceAdditional') {
              const priceType =
                form.getFieldValue('priceType').value || 'retail';
              const newProductList = values.productList.map((product) => {
                return {
                  ...product,
                  selectedPrice: product[priceType],
                };
              });
              console.log(values, formData, priceType, newProductList);
              localStorage.setItem(
                'productList',
                JSON.stringify(values.productList)
              );
              form.setFieldsValue({ ...formData, productList: newProductList });
            }
          }}
        >
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
      {userError && (
        <ModalUserError error={userError} onClose={() => setUserError(null)} />
      )}
      {firebaseError && (
        <ModalFetchError
          error={firebaseError}
          onClose={() => setFirebaseError(null)}
        />
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

ModalModifyItems.propTypes = {
  data: PropTypes.oneOfType([contractorData, goodsData, paymentData]),
  typeData: PropTypes.string.isRequired,
  actionType: PropTypes.string,
  elementId: PropTypes.string,
};

export { ModalModifyItems };
