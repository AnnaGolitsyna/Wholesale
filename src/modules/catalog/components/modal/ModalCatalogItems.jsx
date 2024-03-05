import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Modal, Form } from 'antd';
import { getFieldsForFormList } from '../../../../components/formForModal/getFieldsForFormList';
import renderFormItem from '../../../../components/formForModal/renderFormItem';
import { updateRelatedCompaniesInForm } from './updateFieldsInAdditionalForm';
import useModalActions from '../../../../hook/useModalActions';

const ModalCatalogItems = ({ isModalOpen, data, typeData, actionType }) => {

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { closeModal, createItem, updateItem } = useModalActions(typeData);

 
  const handleSubmit = async () => {
    try {
      const newValue = await form.validateFields();
      console.log('hsubmit', newValue, actionType);

      if (actionType === 'edit') {
        await updateItem(newValue);
      } else {
        await createItem(newValue);
      }
      dispatch(closeModal());
    } catch (error) {
      console.error('Validation failed:', error);
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

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    if ('name' in changedValues) {
      form.setFieldsValue({ fullName: changedValues.name });
    }
  };

  const formList = getFieldsForFormList(form, typeData, actionType, data);

  return (
    <Modal
      centered={true}
      open={isModalOpen}
      onOk={handleSubmit}
      okText={'Сохранить'}
      onCancel={handleClose}
      cancelText={'Закрыть'}
      maskClosable={false}
      destroyOnClose
    >
      <Form.Provider
        onFormFinish={(formType, { values, forms }) => {
          const form = forms[typeData];
          const formData = form.getFieldsValue();
          if (formType === 'ContractorAdditional') {
            updateRelatedCompaniesInForm(values, formData, form);
          }
        }}
      >
        <Form
          name={typeData}
          layout="vertical"
          form={form}
          initialValues={data}
          preserve={false}
          onValuesChange={handleFormValuesChange}
        >
          {formList?.map((formItem) => (
            <Form.Item key={formItem.name} {...formItem}>
              {renderFormItem(formItem)}
            </Form.Item>
          ))}
        </Form>
      </Form.Provider>
    </Modal>
  );
};

const contractorData = PropTypes.shape({
  id: PropTypes.string,
  key: PropTypes.string,
  active: PropTypes.bool.isRequired,
  name: PropTypes.string,
  fullName: PropTypes.string,
  category: PropTypes.string,
  categoryPrice: PropTypes.string,
  taxNumber: PropTypes.string,
  contractNumber: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  email: PropTypes.string,
  phone: PropTypes.string,
  adress: PropTypes.string,
  relatedCompanies: PropTypes.array,
});

const goodsData = PropTypes.shape({
  id: PropTypes.string,
  key: PropTypes.string,
  active: PropTypes.bool.isRequired,
  name: PropTypes.string,
  fullName: PropTypes.string,
  supplier: PropTypes.string,
  cost: PropTypes.number,
  superBulk: PropTypes.number,
  bulk: PropTypes.number,
  retail: PropTypes.number,
  dateStart: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  dateEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
});

ModalCatalogItems.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  data: PropTypes.oneOfType([contractorData, goodsData]),
  typeData: PropTypes.string.isRequired,
  actionType: PropTypes.string,
};

export default ModalCatalogItems;

